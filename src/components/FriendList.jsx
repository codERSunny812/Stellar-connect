import Lottie from "lottie-react";
import { useEffect, useState } from 'react';
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { FaFacebookMessenger } from "react-icons/fa6";
import useStore from "../store/Store";
import Nodata from "../animation/NoData.json";
import { Card } from "antd";
import { TiUserAdd } from "react-icons/ti";
// import { TiUserAdd } from "react-icons/ti";

const FriendList = () => {
  const { friends } = useStore((state) => state);
  const [startIndex, setStartIndex] = useState(0);
    const [cardsToShow, setCardsToShow] = useState(3);

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
            ? friends.length - cardsToShow
            : prev - cardsToShow;
        });
      };
    
      const handleNext = () => {
        setStartIndex((prev) => {
          return prev + cardsToShow >= friends.length
            ? 0
            : prev + cardsToShow;
        });
      };

  console.log(friends);

  return (
    <div className="cards-container">
      {/* Cards Slider */}
      <div className="friend-cards-container">
        <div className="upperPartOfCard">
          <button
            onClick={handlePrev}
            className="arrow-btn"
            disabled={friends.length <= cardsToShow}
          >
            <HiArrowCircleLeft />
          </button>
          <button 
          onClick={handleNext} 
          className="arrow-btn">
            <HiArrowCircleRight />
          </button>
        </div>

        <div className="friendCard">
          {
            friends.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Lottie animationData={Nodata} style={{ height: "150px" }} />
                <p>no request found</p>
              </div>

            ) : (
              friends
                .slice(startIndex, startIndex + cardsToShow)
                .map(({ id , fullName , avatar }) => {
                  return (
                     <div className="myNetworkCardsContent" key={id}>
                          <img src={avatar} alt={fullName} />
                          <p>{fullName}</p>
                              <button
                                className="connectUserBtn"
                              >
                                <FaFacebookMessenger className="connectUserBtn-icon" />
                                <p>message</p>
                              </button>
                            
                          
                        </div>
                  );
                })
            )
          }

        </div>

      </div>
      {/* <CardsComponent /> */}
    </div>
  );
};

export default FriendList;
