import "./sideBar.scss";
import { banner } from "../constants/constant.js";
import { PoundCircleTwoTone, SaveFilled, BulbFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useContext } from "react";
import { UserContext } from "../context/UserInfo.jsx";

const SideBar = () => {
  const { userData } = useContext(UserContext);
  

  // component for the recent item
  const RecentItems = ({ title }) => {
    return (
      <div className="recentItems">
        <BulbFilled className="recentItems_icon" />
        <h5>{title}</h5>
      </div>
    );
  };

  return (
    <div className="sideBar">
      <div className="sideBar_top">
        <img src={banner} alt="user bg" className="sideBar_bg" />
        <img
          src={userData?.imageUrl}
          className="sideBar_avtar"
          alt="user profile photo"
        />
        <h2>{userData?.fullName}</h2>
        <h4>sengersunny448@gmail.com</h4>

        <hr />
        <div className="sideBar_stats">
          <div className="sideBarStats_one">
            <p>profile viewers</p>
            <p className="sideBar_num">239</p>
          </div>

          <div className="sideBarStats_two">
            <p>post impression</p>
            <p className="sideBar_num">22</p>
          </div>
        </div>
        <hr />

        <div className="sideBar_Premium_Info">
          <p className="sideBar_text">get 4x more profile view with premium</p>
          <div className="sideBar_Premium_icon">
            <PoundCircleTwoTone
              twoToneColor="#FCD12A"
              className="sideBar_icon"
            />
            <h6>try for $0</h6>
          </div>
        </div>

        <hr />

        <div className="sideBar_saved_post">
          <SaveFilled className="sideBar_saved_post_icon" />
          <span className="sideBar_saved_text">saved items</span>
        </div>
      </div>

      <div className="sideBar_bottom">
        <p>recent</p>
        <RecentItems title="developers , engineers" />
        <RecentItems title="reactjs" />
        <RecentItems title="programming" />
        <RecentItems title="design" />

        <p>groups</p>

        <RecentItems title="javascript" />
        <RecentItems title="react developer" />
        <RecentItems title="programming" />
        <RecentItems title="geekforgeeks" />
      </div>
    </div>
  );
};
SideBar.propTypes = {
  title: PropTypes.string,
};

export default SideBar;
