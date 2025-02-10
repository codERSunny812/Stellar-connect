/* eslint-disable no-unused-vars */
import "./App.css";
import Home from "./components/Home";
import { Outlet, createBrowserRouter } from "react-router-dom";
import React, { Suspense, useEffect,useState } from "react";
import AuthLayout from "./Auth";
import Error from "./Error";
import SignUpPage from "./components/Signup.jsx";
import SignInPage from "./components/Signin.jsx";
import { useUser } from "@clerk/clerk-react";
import useStore from "./store/Store.js";
import toast, { Toaster } from "react-hot-toast";
import Profile from "./components/Profile.jsx";
import {
  allUserData as fetchAllUser,
  addUser,
  getASpecificUser,
} from "./Collections/user.collection.js";
import { pendingRequest } from "./Collections/friendrequest.collection.js";
import { getFriendList } from "./Collections/friends.collection.js";

// lazy loading the component
const MyNetwork = React.lazy(() => import("./components/MyNetwork"));
const Jobs = React.lazy(() => import("./components/Jobs"));
const Message = React.lazy(() => import("./components/Message"));
const Notification = React.lazy(() => import("./components/Notification"));

function App() {
  const { user } = useUser(); //clerk user object
  const { userData, setUser, allSignedUpUser, setSignedUpUser, requestPending, setPendingRequest, friends, setFriendInTheList } = useStore((state) => state);
 const [userId,setUserId] = useState(null); //state to store the user id


  //uploading the data of the user into the user's collection
  useEffect(() => {
    if(!user) return;
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
              const data = await addUser(userInfo);  //return type is object
              setUserId(data); 
              // console.log("return type of the data after adding it to the firestore:",data)
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
  }, [user]);

  //fetching all the user from the db
  useEffect(() => {
    if (!userData?.id) return;
    const unsubscribe = fetchAllUser(userData?.id, (data) => {
      setSignedUpUser(data);
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [userData?.id, setSignedUpUser]);



  // fetching the pending user list from the db
  useEffect(() => {
    if(!userData?.id) return;
    const unsubscribe = pendingRequest(userData.id, (data) => {
      setPendingRequest(data)
    });

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe(); 
      }
    };
  }, [userData?.id,setPendingRequest]);

  //fetching the  friendList from the DB
  useEffect(()=>{
    if (!userData?.id) return;
   const unsubscribe = getFriendList(userData.id,(data)=>{
    setFriendInTheList(data);
   })

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  },[userData?.id,setFriendInTheList])

  // function to fetch specific user 
  useEffect(() => {
    // console.log("get a specific user function run:")
    if (!userId?.id) return;
    try {
      if (userId) {
        const fetchSpecificUser = async () => {
          const dataInfo = await getASpecificUser(userId?.id);
          // console.log("data of the user from DB:",dataInfo)
          setUser(dataInfo);
        };
        fetchSpecificUser();
      }
    } catch (error) {
      toast.error("error in fetching the data", error.message);
    }
  }, [userId]); // Add userId as a dependency

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
