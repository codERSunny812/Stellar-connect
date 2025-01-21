import "./header.css";
import { Linkedln_logo } from "../constants/constant";
import {
  SearchOutlined,
  HomeFilled,
  ContactsFilled,
  ShoppingFilled,
  MessageFilled,
  BellFilled,
} from "@ant-design/icons";
import HeaderOption from "./HeaderOption";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { UserContext } from "../context/UserInfo";

const Header = () => {
  // const { userData } = useContext(UserContext);
  // console.log("UserData in Header:", userData);

  return (
    <div className="header">
      <div className="header_left">
        <Link to='/'>
          <img src={Linkedln_logo} alt="" />
        </Link>
       

        <div className="header_searchBar">
          <SearchOutlined className="header_searchBar_icon" />
          <input type="search" name="" id="" placeholder="search" />
        </div>
      </div>
      <div className="header_right">
        <Link to="/" style={{ textDecoration: "none" }}>
          <HeaderOption Icon={HomeFilled} title="home" />
        </Link>

        <Link to="/my-network" style={{ textDecoration: "none" }}>
          <HeaderOption Icon={ContactsFilled} title="my network" />
        </Link>

        <Link to="/jobs" style={{ textDecoration: "none" }}>
          <HeaderOption Icon={ShoppingFilled} title="jobs" />
        </Link>

        <Link to="/messages" style={{ textDecoration: "none" }}>
          <HeaderOption Icon={MessageFilled} title="messages" />
        </Link>

        <Link to="notification" style={{ textDecoration: "none" }}>
          <HeaderOption Icon={BellFilled} title="notification" />
        </Link>

        <Link to="/profile" style={{ textDecoration: "none" }}>
          <UserButton />
          {/* <img src={avtar}  /> */}
        </Link>
      </div>
    </div>
  );
};

export default Header;
