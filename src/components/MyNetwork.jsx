import './mynetwork.css';
import { FaPeopleArrows , FaPeopleGroup } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { MdEmojiEvents } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
// import {users as data} from '../data'
import { HiArrowCircleLeft , HiArrowCircleRight } from "react-icons/hi";
import { useState } from 'react';
import { TiUserAdd } from "react-icons/ti";
import useStore from '../store/Store';





const MyNetwork = () => {
  // console.log("inside the mynetwork page");
  const data = useStore((state) => state.allSignedUpUser)
  // console.log("data of all the user inside the mynetwork  page is:",data)
  const [startIndex, setStartIndex] = useState(0);
  const visibleCards = 3;


  const handlePrev = () => {
    setStartIndex((prev) => {
      // If at the beginning, wrap to the end
      return prev - 1 < 0 ? 0 : prev - 1;
    });
  };

  const handleNext = () => {
    setStartIndex((prev) => {
      console.log(prev)
      // If at the end, wrap to the beginning
      return prev + 1 >= data.length ? 0 : prev + 1;
    });
  };

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
             {/* cards  of the user's */}
            <div className="cards-container">
            
              {/* Cards Slider */}
              <div className="cards-container">
                <div className="upperPartOfCard">
                  <button onClick={handlePrev} className="arrow-btn"
                    disabled={data.length <= visibleCards}
                  >
                    <HiArrowCircleLeft />
                  </button>
                  <button onClick={handleNext} className="arrow-btn">
                    <HiArrowCircleRight />
                  </button>
                </div>

                <div className="cardsContent">
                  {data.slice(startIndex, startIndex + visibleCards).map((user) => (
                    <div className="myNetworkCardsContent" key={user.id}>
                      <img src={user.avatar} alt={user.name} />
                      <p>{user.fullName}</p>
                      <button className="connectUserBtn">
                        <TiUserAdd className='connectUserBtn-icon'/>
                        <p>  connect</p>
                       
                      </button>
                    </div>
                  ))}
                </div>
              </div>
               
            
             
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





