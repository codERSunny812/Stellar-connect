import { TiUserAdd } from "react-icons/ti";
import { deleteRequest, handleFriendRequest, sendFriendRequest } from "../Collections/friendrequest.collection";
import { MdCancel } from "react-icons/md";
import useStore from "../store/Store";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const Card = ({ img, name, userid, state, requestId, t, friendId, userId }) => {

  const { friends, userData } = useStore((state) => state);

  // **Check if the user is already a friend**
  const isFriend = friends.some((friend) => friend.id === userid);

  console.log("Is friend:", isFriend);

  // Function to send friend request
  const addFriend = (targetId) => {
    toast.promise(
      sendFriendRequest(userData.id, targetId), // Pass the promise directly here
      {
        pending: "Sending friend request...",
        success: "Friend request sent successfully! 🎉",
        error: "Error in sending the friend request.",
      }
    );
  };


  // Function to handle request acceptance/rejection
  const handleTheRequest = async (action) => {
    await handleFriendRequest(requestId, userId, friendId, action);
  };

  return (
    <div className="myNetworkCardsContent">
      <img src={img} alt={name} />
      <p>{name}</p>

      {state === "pendingFriends" ? (
        t === "sent" ? (
          <button className="cancelUserBtn" onClick={() => deleteRequest(requestId)}>
            <MdCancel className="connectUserBtn-icon" color="white" />
            <p>Cancel Request</p>
          </button>
        ) : (
          <div className="pendingFriendBtn">
            <button className="btn-btn btn-accept" onClick={() => handleTheRequest("accept")}>
              Accept
            </button>
            <button className="btn-btn btn-reject" onClick={() => handleTheRequest("reject")}>
              Reject
            </button>
          </div>
        )
      ) : isFriend ? ( // **If user is a friend, show "Connected"**
        <button className="connectedUserBtn">
          <p>Connected</p>
        </button>
      ) : (
        <button className="connectUserBtn" onClick={() => addFriend(userid)}>
          <TiUserAdd className="connectUserBtn-icon" />
          <p>Connect</p>
        </button>
      )}
    </div>
  );
};

Card.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  userid: PropTypes.string,
  state: PropTypes.string,
  requestId: PropTypes.string,
  t: PropTypes.string,
  friendId: PropTypes.string,
  userId: PropTypes.string,
};

export default Card;
