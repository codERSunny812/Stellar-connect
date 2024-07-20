import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Base from "./components/Base";
import { Suspense } from "react";

const AuthLayout = () => (
  <>
    <SignedIn>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </SignedIn>
    <SignedOut>
      <Base />
    </SignedOut>
  </>
);

export default AuthLayout;
