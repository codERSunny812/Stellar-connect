import useStore from '../store/Store';
import './message.css'
import { FaLinkedin } from "react-icons/fa";

const Message = () => {

  const { userData } = useStore((state) => state);

  console.log(userData)
  return (
    <div className="messageContainer">
      <div className="messageContent">
        {/* left  */}
        <div className="message-left">
        </div>

        {/* mid  */}
        <div className="message-mid">
<h1>mid</h1>
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
