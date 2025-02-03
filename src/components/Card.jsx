import { TiUserAdd } from "react-icons/ti";
import { deleteRequest, handleFriendRequest, sendFriendRequest } from "../Collections/friendrequest.collection";
// import useStore from "../store/Store";
import PropTypes from "prop-types";
import { MdCancel } from "react-icons/md";


const Card = ({img,name,id,state,requestId,t,friendId, userId}) => {

  // console.log("card component is mounted:")
  // console.log("the value of the name prop in the card is:",name);
  // console.log("the value of the id is: ",id);
  // console.log("the request id is:",requestId);
  // console.log("the value of the t is:",t);
  // console.log("the value of the friend id is :",friendId);
  // console.log("the value of the user id is:",userId)
  // console.log("friend user name",connectionUserName);
  // console.log("friends img",connectionUserImg)
  



  // function to add friend
  const addFriend = (targetId) => {
    sendFriendRequest(userId, targetId);
  };

  // function to handle the request 
  const handleTheRequest = async(action)=>{
    if(t == "sent"){
      await handleFriendRequest(requestId,userId,friendId,action)
    }

    await handleFriendRequest(requestId, userId,friendId, action)



  }

  return (
    <div className="myNetworkCardsContent">
      <img src={img} alt={name} />
      <p>{name}</p>
      {
        state === "pendingFriends" ? (
         t === "sent" ? (
            <button
              className="cancelUserBtn"
              onClick={()=> deleteRequest(requestId)}
            >
              <MdCancel className="connectUserBtn-icon" color="white" />
              <p>cancel request</p>
            </button>
         ) : (
        <div className="pendingFriendBtn" >
            <button className="btn-btn btn-accept" onClick={()=> handleTheRequest("accept")}>accept</button>
            <button className="btn-btn btn-reject" onClick={() => handleTheRequest("reject")}>reject</button>
        </div>
         )
      ) : (
          <button
            className="connectUserBtn"
            onClick={() => {
              addFriend(friendId);
            }}
          >
            <TiUserAdd className="connectUserBtn-icon" />
            <p> connect</p>
          </button>
        )
      }
    </div>
  );
};

Card.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  id:PropTypes.string,
  state:PropTypes.string,
  requestId:PropTypes.string,
  t:PropTypes.string,
  friendId:PropTypes.string,
  userId:PropTypes.string,
  connectionUserName:PropTypes.string,
  connectionUserImg:PropTypes.string
};


export default Card;



