import "./sideBar.css";
import { banner } from "../constants/constant.js";
import { BulbFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
import { FaSquare } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import useStore from "../store/Store.js";

const SideBar = () => {

  console.log("side bar component rendered:")
 
  const useData = useStore((state) => state.userData);

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
          src={useData?.imageUrl}
          className="sideBar_avtar"
          alt="user profile photo"
        />
        <h2>{useData?.fullName}</h2>
        <h4>
          SWE@Google{``}||{``} Full Stack Developer🚀 {``}||{``}LeetCode 1 🌟{``}||
          Open source contributer ☯⚒
        </h4>

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
          <p className="sideBar_text">
            <span>
              <FaSquare color="orange" />
            </span>
            see all premium features
          </p>
        </div>

        <hr />

        <div className="sideBar_Premium_Info">
          <p className="sideBar_text">
            <span>
              <FaBookmark color="slategray" />
            </span>
            saved items
          </p>
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
