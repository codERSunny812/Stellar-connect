import "./header.css";
import { Linkedln_logo,avtar } from "../constants/constant";
import {
  SearchOutlined,
  HomeFilled,
  ContactsFilled,
  ShoppingFilled,
  MessageFilled,
  BellFilled,
} from "@ant-design/icons";
import HeaderOption from "./HeaderOption";
import { Link, useLocation } from "react-router-dom";
import useStore from "../store/Store";
import { UserButton } from "@clerk/clerk-react";

const Header = () => {
  const data = useStore((state) => state.userData);

  const location = useLocation();

  let imageUrl = "";
  if (data) {
    imageUrl = data.avatar;
  }
  return (
    <div className="header">
      <div className="header_left">
        <Link to="/">
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

        <Link
          to="/profile"
          style={{ textDecoration: "none", overflow: "hidden" }}
        >
          {location.pathname === "/profile" ? (
            <UserButton className="custom-user" />
          ) : (
            <img
              src={imageUrl || avtar}
              style={{ width: "35px", height: "35px", borderRadius: 50 }}
            />
          )}
        </Link>
      </div>
    </div>
  );
};

export default Header;
