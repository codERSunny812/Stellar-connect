import "./App.css";
import Home from "./components/Home";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import React, { Suspense } from "react";
import AuthLayout from "./Auth";
import { UserProfile } from "@clerk/clerk-react";
import Error from "./Error";

// lazy loading the component
const MyNetwork = React.lazy(() => import("./components/MyNetwork"));
const Jobs = React.lazy(() => import("./components/Jobs"));
const Message = React.lazy(() => import("./components/Message"));
const Notification = React.lazy(() => import("./components/Notification"));

function App() {
  return (
    <>
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
        element: <Signup />,
      },
      {
        path: "/sign-in/*",
        element: <Signin />,
      },
      {
        path:'*',
        element:<Error/>
      }
    ],
  },
]);
