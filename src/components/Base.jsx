import {SignInButton } from "@clerk/clerk-react";
import {Linkedln_logo_full} from '../constants/constant'
import './Base.css';
import Icons from "./Icons";
import {PaperClipOutlined , UsergroupDeleteOutlined , DollarOutlined , QqOutlined} from '@ant-design/icons'
import img from '../../public/img.png'
import { Link } from "react-router-dom";

const Base = () => {

    
  return (
    <div className="base_page">
        <div className="topBar">
            <img src={Linkedln_logo_full} alt="" />
            <div className="icons">

                  <Icons Icons={PaperClipOutlined} name="article"/>
                  <Icons Icons={UsergroupDeleteOutlined} name="people" />
                  <Icons Icons={DollarOutlined} name="jobs" />
                  <Icons Icons={QqOutlined} name="games" />

            </div>

            <SignInButton className="signInBtn" />
        </div>

        <div className="bottomBar">
            <div className="login_crendential">

            <h1>Welcome to your professional community</h1>

                   <p>Continue with google</p>

          <Link to='/sign-in'><p>sign in with email</p></Link>

                  <p className="disclaimer">By clicking Continue to join or sign in, you agree to LinkedIn’s User Agreement, Privacy Policy, and Cookie Policy.</p>

                  <p className="new_user_text">New to LinkedIn? Join now</p>

            </div>

            <img src={img} alt="front imageec" className="base_img" />
        </div>
    </div>
  )
}

export default Base