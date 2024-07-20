import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="center-container">
      <SignIn path="/sign-in" />
    </div>
  );
}
