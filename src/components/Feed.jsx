import "./Feed.css";
import { PictureTwoTone, ToolTwoTone, FilePdfTwoTone } from "@ant-design/icons";
import Post from "./Post";
import { useState, useEffect, useContext } from "react";
import { storage } from "../constants/Firebase.config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
//import { addPost, getPost } from '../Collections/Post';
import PropTypes from "prop-types";
import { UserContext } from "../context/UserInfo";
import Lottie from "lottie-react";
import NoPost from "../animation/NoPost.json";
import zustandStore from "../store/Store";
import OutsideClickHandler from "react-outside-click-handler";
import { RxCross1 } from "react-icons/rx";


const Feed = ({ userId }) => {
  // const [posts, setPost] = useState([]);
  const [postCaption, setPostCaption] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const { userData } = useContext(UserContext);
  const { posts, fetchPosts, addPost, likePost } = zustandStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCaption = (e) => {
    setPostCaption(e.target.value);
  };

  // const handleInputKeyPress = async (e) => {
  //   if (e.key === "Enter" && postCaption.trim()) {
  //     await handleSubmit();
  //   }
  // };

  const handleFileChange = async (e) => {
    if (e.target.files[0]) {
      setMediaFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    let mediaUrl = "";

    if (mediaFile) {
      try {
        const storageRef = ref(storage, `media/${mediaFile.name}`);
        await uploadBytes(storageRef, mediaFile);
        mediaUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const newPost = {
        caption: postCaption,
        media: mediaUrl,
        userId: userId,
        createdAt: new Date(),
        likes: 0,
      };
      await addPost(newPost);
      // setPost(prevPosts => [...prevPosts, { id: postId, ...newPost }]);
      setPostCaption("");
      setMediaFile(null);
    } catch (error) {
      console.log("error in adding the document");
    }
  };

  const handleModel = () => {
    setIsModal(true);
  };

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);


  // console.log(posts)
  console.log(postCaption)
  console.log(userData);

  return (
    <div className="feed">
      {/* Post upload section */}
      <div className="feedSection_top">
        <div className="feedSection_upload_section">
          <img
            src={userData.imageUrl}
            alt=""
            style={{ borderRadius: "50%", height: "50px", width: "50px" }}
          />
          {/* <input
    type="text"
    id="upload_section_input"
    placeholder="Start a post"
    value={postCaption}
    onChange={handleInputChange}
    onKeyPress={handleInputKeyPress}
    onClick={handleModel}

  /> */}
          <div
            id="upload_section_input"
            className="fake-input"
            onClick={handleModel}
          >
            Start a post
          </div>
          <OutsideClickHandler
            onOutsideClick={(e) => {
              if (isModal) {
                console.log("Outside clicked", e.target); // For debugging
                setIsModal(false);
              }
            }}
          >
            {isModal && (
              <div className="post-upload-section">
                <div className="post-upload-content">

                  {/* modal head  */}
                  <div className="post-popup-top">
                    <div className="left">
                      <img
                        src={userData.imageUrl}
                        alt=""
                        style={{
                          borderRadius: "50%",
                          height: "50px",
                          width: "50px",
                        }}
                      />
                      <div className="text">
                        <h2>{userData.fullName}</h2>
                        <p>post to any one</p>
                      </div>
                    </div>
                    <div className="right">
                      <RxCross1 onClick={() => setIsModal(false)} />
                    </div>
                  </div>

                  {/* Modal Body */}
                  <div className="modal-body">
                    <textarea
                      placeholder="What do you want to talk about?"
                      className="post-input"
                      value={postCaption}
                      onChange={handlePostCaption}
                      aria-label="Post caption"
                    ></textarea>
                  </div>

                    <hr />

                  {/* Modal Footer */}
                  <div className="modal-footer">
                    <div className="action-buttons">
                      <button className="attach-button">📷 Photo</button>
                      <button className="attach-button">🎥 Video</button>
                      <button className="attach-button">💼 Job</button>
                    </div>
                    <button className="post-button">Post</button>
                  </div>
                </div>
              </div>
            )}
          </OutsideClickHandler>
        </div>
        <div className="feedSection_file_select">
          <div className="feedSection_file_select">
            <label>
              <PictureTwoTone className="feedSection_icon" twoToneColor="red" />
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </label>
            <p>media</p>
          </div>
          <div className="feedSection_job_icon">
            <ToolTwoTone className="feedSection_icon" twoToneColor="green" />
            <p>jobs</p>
          </div>
          <div className="feedSection_article_icon">
            <FilePdfTwoTone
              className="feedSection_icon"
              twoToneColor="orange"
            />
            <p>article</p>
          </div>
        </div>
      </div>

      {/* Post section of the feed */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.userId}>
            <Post post={post} likePost={likePost} />
          </div>
        ))
      ) : (
        <div className="no-post">
          <Lottie animationData={NoPost} className="no-post-anim" />
          <p>No posts available</p>
        </div>
      )}
    </div>
  );
};

Feed.propTypes = {
  userId: PropTypes.string,
};

export default Feed;
