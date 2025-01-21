/* eslint-disable no-unused-vars */
import "./App.css";
import Home from "./components/Home";
import { Outlet, createBrowserRouter } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import AuthLayout from "./Auth";
import { UserProfile } from "@clerk/clerk-react";
import Error from "./Error";
import SignUpPage from "./components/Signup.jsx";
import SignInPage from "./components/Signin.jsx";
import { useUser } from "@clerk/clerk-react";
import useStore  from './store/Store.js'
// import { ToastContainer } from "react-toastify"; // Import ToastContainer
// import "react-toastify/dist/ReactToastify.css"; // Import CSS for Toastify
import toast, { Toaster } from 'react-hot-toast';

// lazy loading the component
const MyNetwork = React.lazy(() => import("./components/MyNetwork"));
const Jobs = React.lazy(() => import("./components/Jobs"));
const Message = React.lazy(() => import("./components/Message"));
const Notification = React.lazy(() => import("./components/Notification"));

function App() {
  const {user} = useUser(); //clerk user object
  const { userData,setUser }= useStore((state)=>state);

  // console.log("user data in clerk:",user)
  // console.log("user data in our store:", userData)
  // console.log("user update function in our store:",setUser)

  //update the state of the store with the clerk user data
  useEffect(() => {
    if (user && (!userData || user.id !== userData.id)) {
      const loggedInUserData = {
        id: user.id,
        fullName: user.fullName,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
      };

      setUser(loggedInUserData);
    }
  }, [user, userData, setUser]);

  
  return (
    <>
      <Toaster />
      {/* <ToastContainer
        // position="top-center"
        // autoClose={3000}
        // hideProgressBar={false}
        // newestOnTop
        // closeOnClick
        // rtl={false}
        // pauseOnFocusLoss
        // draggable
        // pauseOnHover
        // theme="dark"
      /> */}
      {/* <Toaster/> */}
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
                <UserProfile />{" "}
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
