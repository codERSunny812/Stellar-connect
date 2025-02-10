import { useEffect, useRef, useState } from "react";
import useStore from "../store/Store";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa6";
import { TbGif } from "react-icons/tb";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import "./MessagePromt.css";
import { listenForMessages, sendMessage } from "../Collections/message.collection";
import NoData from "../animation/NoChats.json";
import Lottie from "lottie-react";
import PropTypes from "prop-types";
import { FcVideoCall } from "react-icons/fc";
import { IoCall } from "react-icons/io5";


const MessagePromt = ({ selectedFriend }) => {
  
  const { userData } = useStore((state) => state);
  const [sentMessage, setSentMessage] = useState("");
  const [message, setMessage] = useState([]);
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  useEffect(() => {
    if (!selectedFriend || !userData?.id) return;
    const unsubscribe = listenForMessages(userData.id, selectedFriend.id, setMessage);

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [selectedFriend, userData?.id]);

  // Scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  const handleMessage = async () => {
    if (sentMessage.trim()) {
      await sendMessage(userData.id, selectedFriend.id, sentMessage);
      setSentMessage("");
    }
  };

  return (
    <div className="topOfMessagePrompt">
      {/* Header */}
      <div className="headerOfMessagePrompt">
        <div className="header-info">
        <img src={selectedFriend?.avatar} alt="" />
        <h3>{selectedFriend?.fullName}</h3>
        </div>
        <div className="header-icons">
        <FcVideoCall fontSize={22}/>
        <IoCall fontSize={22}/>
        </div>
      </div>

      {/* Messages */}
      <div className="midOfMessagePrompt">
        {message.length > 0 ? (
          message.map((data) => (
            <div key={data?.id} className={data?.senderId === userData.id ? "messages sent" : "messages received"}>
              <p>{data?.message}</p>
            </div>
          ))
        ) : (
          <div className="nomessage">
            <Lottie className="anim" animationData={NoData} />
            <p>No chats found</p>
          </div>
        )}
        {/* Empty div for auto-scroll */}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input Section */}
      <div className="endOfMessagePrompt">
        <div className="textAreaOfMessagePrompt">
          <textarea
            className="message-input"
            placeholder="Write any message"
            value={sentMessage}
            onChange={(e) => setSentMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="controlOfMessagePrompt">
          <div className="left">
            <MdPhotoSizeSelectActual />
            <FaPaperclip />
            <TbGif />
            <HiOutlineEmojiHappy />
          </div>
          <div className="right">
            <button
              type="button"
              className={sentMessage.length === 0 ? "send-btn disabled" : "send-btn active"}
              disabled={sentMessage.length === 0}
              onClick={handleMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MessagePromt.propTypes = {
  selectedFriend: PropTypes.object,
};

export default MessagePromt;
