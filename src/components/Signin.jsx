import { SignIn } from "@clerk/clerk-react"

export default function Signin() {
    return(
    <div className="center-container">
        <SignIn path="/sign-in" />
    </div>
    )
}