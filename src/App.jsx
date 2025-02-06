/* eslint-disable no-unused-vars */
import "./App.css";
import Home from "./components/Home";
import { Outlet, createBrowserRouter } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import AuthLayout from "./Auth";
import Error from "./Error";
import SignUpPage from "./components/Signup.jsx";
import SignInPage from "./components/Signin.jsx";
import { useUser } from "@clerk/clerk-react";
import useStore from "./store/Store.js";
import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile.jsx";
import {
  allUserData as fetchAllUser,
  addUser,
} from "./Collections/user.collection.js";
import { pendingRequest } from "./Collections/friendrequest.collection.js";
import { getFriendList } from "./Collections/friends.collection.js";

// lazy loading the component
const MyNetwork = React.lazy(() => import("./components/MyNetwork"));
const Jobs = React.lazy(() => import("./components/Jobs"));
const Message = React.lazy(() => import("./components/Message"));
const Notification = React.lazy(() => import("./components/Notification"));

function App() {
  console.log("the app component is rendred:")
  const { user } = useUser(); //clerk user object
  const { userData, setUser, allSignedUpUser, setSignedUpUser, requestPending, setPendingRequest, friends, setFriendInTheList } = useStore((state) => state);


  //uploading the data of the user into the user's collection
  useEffect(() => {
    try {
      if (user) {

        const userInfo = {
          id: user.id,
          fullName: user.fullName,
          imageUrl: user.imageUrl,
          firstName: user.firstName,
        };

        const addUserToDb = async () => {
          if (userInfo && userInfo?.id) {
            try {
              const data = await addUser(userInfo);
              setUser(data); //updating the zustand store
            } catch (error) {
              console.log(`Error adding user to firestore DB: ${error?.message}`);
            }
          }
        };
        addUserToDb();
      }
    } catch (error) {
      console.error("error in adding the user into the DB", error.message);
    }
  }, [user, setUser]);

  // //fetching all the user from the db
  useEffect(() => {
    // early return 
    if(!userData?.id) return;
    const unsubscribe  = fetchAllUser(userData?.id,(data)=>{
      setSignedUpUser(data);
    })
    

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe(); // Cleanup function to prevent memory leaks
      }
    };
  }, [userData.id, setSignedUpUser]);


  // // fetching the pending user list from the db
  useEffect(() => {
    const unsubscribe = pendingRequest(userData.id, (data) => {
      setPendingRequest(data)
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe(); 
      }
    };
  }, [userData?.id,setPendingRequest]);

  // // fetching the  friendList from the DB
  useEffect(()=>{
   const unsubscribe = getFriendList(userData.id,(data)=>{
    setFriendInTheList(data);
   })

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  },[userData?.id,setFriendInTheList])
  return (
    <>
      <Toaster />
      <Outlet />
    </>
  );
}

export default App;

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "/my-network",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <MyNetwork />
              </Suspense>
            ),
          },
          {
            path: "/jobs",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Jobs />
              </Suspense>
            ),
          },
          {
            path: "/messages",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Message />
              </Suspense>
            ),
          },
          {
            path: "/notification",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Notification />
              </Suspense>
            ),
          },
          {
            path: "/profile",
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                {" "}
                {/* <UserProfile />{" "} */}
                <Profile />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
