import useStore from "../store/Store";
import { MdPhotoSizeSelectActual } from "react-icons/md";
import { FaPaperclip } from "react-icons/fa6";
import { TbGif } from "react-icons/tb";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import "./MessagePromt.css";
import { useState } from "react";

const MessagePromt = () => {
  const { userData } = useStore((state) => state);
  const [message, setMessage] = useState("");

  return (
    <div className="topOfMessagePrompt">
      {/* top part  */}
      <div className="headerOfMessagePrompt">
        <img src={userData.imageUrl} alt="" />
        <h3>{userData.fullName}</h3>
      </div>

      <div className="midOfMessagePrompt"></div>

      <div className="endOfMessagePrompt">
        <div className="textAreaOfMessagePrompt">
          <textarea
            className="message-input"
            placeholder="write a message"
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
              className={
                message.length === 0 ? "send-btn disabled" : "send-btn active"
              }
              disabled={message.length === 0}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagePromt;
