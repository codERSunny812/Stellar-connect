import { useState } from 'react';
import useStore from '../store/Store';
import './message.css'
import Lottie from 'lottie-react';
import data from '../animation/NoChats.json'
import MessagePromt from './MessagePromt';


const Message = () => {
    
  const [messageSection,setMessageSection] = useState(false);
  const { userData, friends } = useStore((state) => state);
  const [selectedFriend , setSelectedFriend] = useState(null);

  const handleFriends=({id,avatar,fullName})=>{
    setSelectedFriend({
      id:id,
      avatar:avatar,
      fullName:fullName
    })
    setMessageSection(true);
  }

  return (
    <div className="messageContainer">
      <div className="messageContent">
        {/* left  */}
        <div className="message-left">
        </div>

        {/* mid  */}
        <div className="message-mid">
          <p>messaging</p>
          <div className="mid-content">
            
            {/* for friend  */}
            <div className="mid-part1">
              {
                friends.map(({id,fullName,avatar})=>{
                  return(
                    <div className="mid-user-content" key={id}
                    onClick = {()=> handleFriends({id,avatar,fullName})}
                    >

                      <img src={avatar} alt="" />
                      <h3>{fullName}</h3>
                     
                    </div>
                  )
                })
              }

            </div>

          {/* for the chat section  */}
            <div className="mid-part2">
              {
              messageSection ?
              (
                <MessagePromt selectedFriend={selectedFriend}/> 
              ):(
                <div className="NoChatAnim">
                  <Lottie animationData={data} className='anim'/>
                  <h4>no chats avaiable !!</h4>
                  <p>select a friend to show the chats</p>
                </div>
              )
            }
            </div>
          </div>

        </div>

        {/* right  */}
        <div className="message-right">
          <div className="right-content-message">
            <div className="upper-part-of-message">

              <p>{userData.fullName} restart your premium trail today</p>

              <div className="message-content-image">
                <img src={userData.imageUrl} alt="" className='userImg' />
                <img src="/image.png" alt="" />
              </div>

              <p>see who view your profile in the last 365 days</p>

              <button className='btn'>retry for free!</button>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
};

export default Message;
