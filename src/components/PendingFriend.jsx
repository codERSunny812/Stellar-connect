import { useEffect, useState } from "react";
import useStore from "../store/Store";
import Card from "./Card";
import "./pendingFriend.css";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import Lottie from "lottie-react";
import NoData from "../animation/NoData.json";

const PendingFriend = () => {
  const { requestPending } = useStore((state) => state);
  const [startIndex, setStartIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);

  // console.log("the data of the pending friends", requestPending);

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
        ? requestPending.length - cardsToShow
        : prev - cardsToShow;
    });
  };

  const handleNext = () => {
    setStartIndex((prev) => {
      return prev + cardsToShow >= requestPending.length
        ? 0
        : prev + cardsToShow;
    });
  };

  return (
    <div className="cards-container">
      {/* Cards Slider */}
      <div className="cards-container">
        <div className="upperPartOfCard">
          <button
            onClick={handlePrev}
            className="arrow-btn"
            disabled={requestPending.length <= cardsToShow}
          >
            <HiArrowCircleLeft />
          </button>
          <button onClick={handleNext} className="arrow-btn">
            <HiArrowCircleRight />
          </button>
        </div>

        <div className="cardsContent">
          {requestPending.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Lottie animationData={NoData} style={{ height: "150px" }} />
              <p>no request found</p>
            </div>
          ) : (
            requestPending
              .slice(startIndex, startIndex + cardsToShow)
              .map(
                ({
                  friendName,
                  friendProfilePic,
                  friendId,
                  id,
                  type,
                  userId,
                }) => {
                  return (
                    <div key={friendId}>
                      <Card
                        name={friendName}
                        img={friendProfilePic}
                        state="pendingFriends"
                        friendId={friendId}
                        userId={userId}
                        requestId={id}
                        t={type}
                      />
                    </div>
                  );
                }
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingFriend;
