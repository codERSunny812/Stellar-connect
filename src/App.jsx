/* eslint-disable no-unused-vars */
import "./App.css";
import Home from "./components/Home";
import { Outlet, createBrowserRouter } from "react-router-dom";
import React, { Suspense, useEffect , useState } from "react";
import AuthLayout from "./Auth";
import Error from "./Error";
import SignUpPage from "./components/Signup.jsx";
import SignInPage from "./components/Signin.jsx";
import { useUser } from "@clerk/clerk-react";
import useStore  from './store/Store.js'
import { Toaster } from 'react-hot-toast';
import Profile from "./components/Profile.jsx";
import { allUserData as fetchAllUser , addUser } from "./Collections/user.collection.js";


// lazy loading the component
const MyNetwork = React.lazy(() => import("./components/MyNetwork"));
const Jobs = React.lazy(() => import("./components/Jobs"));
const Message = React.lazy(() => import("./components/Message"));
const Notification = React.lazy(() => import("./components/Notification"));

function App() {
  // console.log("app component rendered")
  const {user} = useUser(); //clerk user object
  const { userData , setUser, allSignedUpUser, setSignedUpUser }= useStore((state)=>state);
  const [allUser,setAllUser] = useState(allSignedUpUser)
  // console.log("value of user clerk object in app component:",user);
  // console.log("value of the  user data from the store in app component:",userData);
  // console.log("value of the  set user function inside the app component is:",setUser);
  // console.log("value of the all allSignedUpUser variable inside the app component is:",allSignedUpUser);
  // console.log("value of the setSignedUpUser func inside the app component is:",setSignedUpUser);
  

  //uploding the data of the user into the user's collection
   useEffect(()=>{
    try {
      // console.log("uploading the user data into the firestore collection:")
      if(user){
        const userInfo = {
          id: user.id,
          fullName: user.fullName,
          imageUrl: user.imageUrl,
          firstName: user.firstName,
        }

        const addUserToDb = async () => {
             if (userInfo && userInfo?.id) {
               try {
                const data =  await addUser(userInfo);
                setUser(data);
                // console.log("user data is upadted in the zustand store:")
               } catch (error) {
                 console.log(`Error adding user to DB: ${error.message}`);
               }
             }
           };
           addUserToDb();
      }
     } catch (error) {
       console.error("error in adding the user into the DB",error.message)
    }
  },[user])



// update the all user data 
useEffect(()=>{
  // console.log("fetching the data of all the logged in user from the db")
const fetchedAllUser = async()=>{
const allUserData = await fetchAllUser();
setSignedUpUser(allUserData);
// console.log("updating the state of the user in the db.")
}

fetchedAllUser();
},[user,userData])


  
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
                <Profile/>
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage/>,
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
