import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  // console.log("inside the signin page")
  return (
    <div className="center-container">
      <SignIn path="/sign-in" />
    </div>
  );
}
