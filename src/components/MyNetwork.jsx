import "./mynetwork.css";
import { FaPeopleArrows, FaPeopleGroup } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { MdEmojiEvents } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { useState, useEffect } from "react";
import useStore from "../store/Store";
import PendingFriend from "./PendingFriend";
import Card from "./Card";
import FriendList from "./FriendList";

const MyNetwork = () => {
  const { allSignedUpUser, requestPending, friends} = useStore((state) => state);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [selectState, setSelectState] = useState("");


  // Update the number of cards to show based on screen size
  useEffect(() => {
    const updateCardsToShow = () => {
      setCardsToShow(window.innerWidth <= 768 ? 1 : 3);
    };

    updateCardsToShow(); // Set initial value
    window.addEventListener("resize", updateCardsToShow);

    // clean event
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  // function to handle the cursoul
  const handlePrev = () => {
    setStartIndex((prev) => {
      return prev - cardsToShow < 0
        ? allSignedUpUser.length - cardsToShow
        : prev - cardsToShow;
    });
  };

  const handleNext = () => {
    setStartIndex((prev) => {
      return prev + cardsToShow >= allSignedUpUser.length
        ? 0
        : prev + cardsToShow;
    });
  };


  return (
    <>
      <div className="myNetworkContainer">
        <div className="myNetworkGridContainer">
          {/* Left margin */}
          <div></div>

          {/* Main Content */}
          <div className="myNetworkList">
            <div className="topPartMyNetwork">
              <h1>manage my network</h1>
            </div>
            <div className="bottomPartMyNetwork">
              <div className="MyNetwork">
                <div
                  className="Item1"
                  onClick={() => setSelectState("connection")}
                >
                  <FaPeopleArrows className="icon" />
                  <h3>connections</h3>
                </div>

                <span>{friends.length}</span>
              </div>

              <div className="MyNetwork">
                <div
                  className="Item2"
                  onClick={() => setSelectState("pending request")}
                >
                  <MdContactPhone className="icon" />
                  <h3>pending request</h3>
                </div>

                <span>{requestPending.length}</span>
              </div>

              <div className="MyNetwork">
                <div className="Item3">
                  <FaPeopleGroup className="icon" />
                  <h3>contacts</h3>
                </div>
                <span>23</span>
              </div>

              <div className="MyNetwork">
                <div className="Item4">
                  <HiUserGroup className="icon" />
                  <h3>groups</h3>
                </div>
                <span>34</span>
              </div>

              <div className="MyNetwork">
                <div className="Item5">
                  <MdEmojiEvents className="icon" />
                  <h3>events</h3>
                </div>

                <span>3</span>
              </div>

              <div className="MyNetwork Item6">
                <div className="Item6">
                  <RiPagesFill className="icon" />
                  <h3>pages</h3>
                </div>
                <span>43</span>
              </div>
            </div>
          </div>

          {/* Invitations or Info */}

          <div className="">

            {
              selectState && (
              <div className="connectionRequestDiv">
                <div className="connectionRequestDivHeading">
                  <h1>{selectState}</h1>
                  {/* data of selected state */}
                  {
                    selectState == "connection" ? (
                    <FriendList />
                  ) : (
                  <PendingFriend />
                )
                  }
                </div>
              </div>)
            } 
           

            <div className="myNetworkInfo">
              <div className="topPartMyNetwork">
                <h1>Grow your network</h1>
              </div>
              {/* cards  of the user's */}

              <div className="cards-container">
                {/* Cards Slider */}
                <div className="cards-container">
                  <div className="upperPartOfCard">
                    <button
                      onClick={handlePrev}
                      className="arrow-btn"
                      disabled={allSignedUpUser.length <= cardsToShow}
                    >
                      <HiArrowCircleLeft />
                    </button>
                    <button onClick={handleNext} className="arrow-btn">
                      <HiArrowCircleRight />
                    </button>
                  </div>

                  <div className="cardsContent">
                    {
                    allSignedUpUser
                      .slice(startIndex, startIndex + cardsToShow)
                      .map((user) => {
                        return (
                          <div key={user.id} >
                            <Card img={user.avatar} altText={user.name} name={user.fullName} userid={user.id}/>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div></div>
        </div>
      </div>
    </>
  );
};

export default MyNetwork;
