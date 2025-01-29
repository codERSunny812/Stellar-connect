import "./mynetwork.css";
import { FaPeopleArrows, FaPeopleGroup } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi2";
import { MdEmojiEvents } from "react-icons/md";
import { RiPagesFill } from "react-icons/ri";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { useState, useEffect } from "react";
import { TiUserAdd } from "react-icons/ti";
import useStore from "../store/Store";

const MyNetwork = () => {
  console.log("inside the mynetwork page");
  const { userData, allSignedUpUser } = useStore((state) => state);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [allUserExceptLogged, setAllUserExceptLogged] =
    useState(allSignedUpUser);

  console.log("userData:",userData)
  console.log("all user from db:",allSignedUpUser)
  // console.log("all connection:",connections)
  console.log("cards to show",cardsToShow)
  console.log("new all user:",allUserExceptLogged)

  // Update the number of cards to show based on screen size
  useEffect(() => {
    console.log("inside the use effect")
    //function to update the list
    const newArr = allSignedUpUser.filter((data) => {
      return data.id != userData.id;
    });

    setAllUserExceptLogged(newArr);

    const updateCardsToShow = () => {
      setCardsToShow(window.innerWidth <= 768 ? 1 : 3);
    };

    updateCardsToShow(); // Set initial value
    window.addEventListener("resize", updateCardsToShow);

    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const handlePrev = () => {
    setStartIndex((prev) => {
      return prev - cardsToShow < 0
        ? allUserExceptLogged.length - cardsToShow
        : prev - cardsToShow;
    });
  };

  const handleNext = () => {
    setStartIndex((prev) => {
      return prev + cardsToShow >= allUserExceptLogged.length
        ? 0
        : prev + cardsToShow;
    });
  };

  const addFriend = () => {
    alert("hola");
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
                <div className="Item1">
                  <FaPeopleArrows className="icon" />
                  <h3>connections</h3>
                </div>

                <span>11</span>
              </div>

              <div className="MyNetwork">
                <div className="Item2">
                  <MdContactPhone className="icon" />
                  <h3>followings</h3>
                </div>

                <span>23</span>
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
                  {allUserExceptLogged
                    .slice(startIndex, startIndex + cardsToShow)
                    .map((user) => {
                      return (
                        <div className="myNetworkCardsContent" key={user.id}>
                          <img src={user.avatar} alt={user.name} />
                          <p>{user.fullName}</p>
                          <button
                            className="connectUserBtn"
                            onClick={()=>{
                              addFriend()
                            }}
                          >
                            <TiUserAdd className="connectUserBtn-icon" />
                            <p> connect</p>
                          </button>
                        </div>
                      );
                    })}
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
