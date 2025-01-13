import { SignInButton } from "@clerk/clerk-react";
import {
  Linkedln_logo_full,
  collabrativeArcticle,
  findJobs,
  postJob,
  software_tools,
} from "../constants/constant";
import "./Base.css";
import Icons from "./Icons";
import {
  PaperClipOutlined,
  UsergroupDeleteOutlined,
  DollarOutlined,
  QqOutlined,
  TwitterOutlined,
  MailFilled,
} from "@ant-design/icons";
import img from "../../public/img.png";
import Screen2 from "./Screen/Screen2";
import Footer from "./Screen/Footer";
import {Link} from 'react-router-dom'

const Base = () => {
  return (
    <div className="base_page">
      <div className="topBar">
        <img src={Linkedln_logo_full} alt="" />
        <div className="icons">
          <Icons Icons={PaperClipOutlined} name="article" />
          <Icons Icons={UsergroupDeleteOutlined} name="people" />
          <Icons Icons={DollarOutlined} name="jobs" />
          <Icons Icons={QqOutlined} name="games" />
        </div>

        <SignInButton className="signInBtn" />
      </div>

      <div className="bottomBar">

        <div className="login_crendential">
          <h1>Welcome to your professional community</h1>

          <div className="twitter">
            <TwitterOutlined style={{ color: "white", fontSize: "26px" }} />
            <p>Continue with twitter</p>
          </div>

          <div className="email">
            <MailFilled style={{ color: "white", fontSize: "26px" }} />
            <p> <Link to='/sign-up' className="login_in_link"> Continue with email </Link></p>
          </div>

          <p className="disclaimer">
            By clicking Continue to join or sign in, you agree to{" "}
            <span> LinkedIn’s User Agreement, Privacy Policy</span>, and{" "}
            <span> Cookie Policy.</span>{" "}
          </p>

          <p className="new_user_text">
            New to LinkedIn? <span> 
              <Link to='/sign-up' className="sign_up_link">
              Join now
              </Link>
              </span>{" "}
          </p>
        </div>

        <img src={img} alt="front imageec" className="base_img" />
        
      </div>

      {/* second screen 2 */}
      <Screen2
        arr={collabrativeArcticle}
        mainHeading="Explore collaborative articles"
        para="We’re unlocking community knowledge in a new way. Experts add insights directly into each article, started with the help of AI."
        bgColor="#808080"
      />

      {/* screen 3 */}
      <Screen2
        mainHeading="Find right job or internship for you"
        arr={findJobs}
        bgColor="white"
      />

      {/* screen 4 */}

      <Screen2
        mainHeading="Post your job for millions of people to see"
        arr={postJob}
        bgColor="Beige"
      />

      <Screen2
        mainHeading="Discover the best software tools"
        para="Connect with buyers who have first-hand experience to find the best products for you."
        arr={software_tools}
        bgColor="white"
      />
      <Footer />
    </div>
  );
};

export default Base;
