import './mynetwork.css';
import { FaPeopleArrows , FaPeopleGroup } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { MdEmojiEvents } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";



const MyNetwork = () => {
  return (
    <>
      <div className="myNetworkContainer">
        <div className="myNetworkGridContainer">
          {/* Left margin */}
          <div>
          </div>

          {/* Main Content */}
          <div className="myNetworkList">
            <div className="topPartMyNetwork">
              <h1>manage my network</h1>
            </div>
            <div className="bottomPartMyNetwork">
              <div className="MyNetwork">

                <div className="Item1">
                  <FaPeopleArrows className='icon' />
                  <h3>connections</h3>
                </div>
                
                <span>23</span>

              </div>
              <div className="MyNetwork">
                <div className="Item2">
                  <MdContactPhone className='icon' />
                  <h3>contacts</h3>
                </div>
                
                <span>23</span>
              </div>
              <div className="MyNetwork">
                <div className="Item3">
                  <FaPeopleGroup className='icon' />
                  <h3>contacts</h3>
                </div>
                <span>23</span>
              </div>
              <div className="MyNetwork">
                <div className="Item4">
                  <HiUserGroup className='icon' />
                  <h3>groups</h3>
                </div>
                <span>34</span>
              </div>
              <div className="MyNetwork">
               <div className="Item5">
                  <MdEmojiEvents className='icon' />
                  <h3>events</h3>
               </div>
              
              <span>3</span>
              </div>
              <div className="MyNetwork Item6">
                <div className="Item6">
                  <RiPagesFill className='icon' />
                  <h3>pages</h3>
                </div>
                <span>43</span>
              </div>

            </div>
          </div>

          {/* Invitations or Info */}
          <div className="myNetworkInfo">
            <div className="topPartMyNetwork">
              <h1>Grow your network</h1>
            </div>
           
           
          </div>

          {/* Right Sidebar */}
          <div>
          
          </div>

        </div>
      </div>
    </>
  );
};

export default MyNetwork;
