import { SignUp } from "@clerk/clerk-react"

export default function Signin() {
  return (
    <div className="center-container">
      <SignUp path="/sign-up" />
    </div>
  )
}