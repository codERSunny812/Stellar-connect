import "./Feed.css";
import { PictureTwoTone, ToolTwoTone, FilePdfTwoTone } from "@ant-design/icons";
import Post from "./Post";
import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import NoPost from "../animation/NoPost.json";
import { RxCross1 } from "react-icons/rx";
import useStore from "../store/Store";
import { fileUpload, resizeFile } from "../Service/file.upload";
import toast from "react-hot-toast";

const Feed = () => {
  const [postCaption, setPostCaption] = useState("");
  const [mediaFile, setMediaFile] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { userData,fetchPosts, posts, addPost } = useStore((state) => state);

  // console logs to check the data 
  // console.log("post captio in the post component:",postCaption);
  // console.log("media file in the post component:", mediaFile);
  // console.log("is modal value in the post component:",isModal);
  // console.log("image preview in the post component:",imagePreview);
  // console.log("the data from the zustand store in the post component",userData,fetchPosts,posts,addPost);

  
  // function to handle the model
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        setIsModal(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // fetching all post data from DB
  useEffect(() => {
    const unsubscribe = fetchPosts(); // Call the function and store the unsubscribe function

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe(); // Cleanup function to prevent memory leaks
      }
    };
  }, [userData, fetchPosts]); 

  // function to handle the post caption``
  const handlePostCaption = (e) => {
    setPostCaption(e.target.value);
  };

  // function to handle the image upload
  const handleImgUpload = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setMediaFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // clear the file  preview
  const clearImagePreview = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview); // clear the memory
    }
    setMediaFile(null);
    setImagePreview(null);
  };

  // function to upload the image upload after the button click
  const handlePostUpload = async () => {
    // toast message if the caption and media file is empty
    if (!postCaption && !mediaFile) {
      return toast("Please add a caption or media before posting.", {
        duration: 3000,
        position: "top-center",
        pauseOnHover: true,
        //custom icon
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
          width: "300px",
        },
      });
    }
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          let resizeFileUrl = "";
          let mediaUrl = "";

          if (mediaFile) {
            //resize the image before uploading
            resizeFileUrl = await resizeFile(mediaFile);

            mediaUrl = await fileUpload(resizeFileUrl); // upload the resized file to the cloudinary
          }

          //create the post object
          const postContent = {
            caption: postCaption || "",
            media: mediaUrl || "",
            uploadUser: userData,
            createdAt: new Date(),
            like: 0,
            isLiked: false,
            likedUser: [],
          };

          //add the post to the firestore and also update the user
          await addPost(postContent, userData.id);
          fetchPosts();

          //clear the state of the image and text area
          setPostCaption("");
          clearImagePreview();
          setIsModal(false);
          resolve("Post uploaded successfully! 🎉");
        } catch (error) {
          reject("Failed to upload the post. 😞");
          console.error("Error uploading file:", error.message);
        }
      }),
      {
        loading: "Loading",
        success: "post uploaded successfully",
        error: "Error in uploading post",
      }
    );
  };

  const handleModel = () => {
    setIsModal(true);
  };

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

          <div
            id="upload_section_input"
            className="fake-input"
            onClick={handleModel}
          >
            Start a post
          </div>

          {
          isModal && (
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
                    <RxCross1
                      onClick={() => setIsModal(false)}
                      aria-label="close model"
                    />
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

                  {imagePreview && (
                    <div className="image-preview">
                      <img src={imagePreview} alt="Selected preview" />
                      <div
                        onClick={clearImagePreview}
                        className="clear-preview-btn"
                      >
                        <RxCross1 />
                      </div>
                    </div>
                  )}
                </div>

                <hr />

                {/* Modal Footer */}
                <div className="modal-footer">
                  <div className="action-buttons">
                    <label className="attach-button">
                      📷 Photo
                      <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={handleImgUpload}
                      />
                    </label>
                    <button className="attach-button">🎥 Video</button>
                    <button className="attach-button">💼 Job</button>
                  </div>
                  <button className="post-button" onClick={handlePostUpload}>
                    Post
                  </button>
                </div>
              </div>
            </div>
          )
          }

        </div>

        <div className="feedSection_file_select">
          <div className="feedSection_file_select">
            <PictureTwoTone className="feedSection_icon" twoToneColor="" />
            <p>media</p>
          </div>
          <div className="feedSection_job_icon">
            <ToolTwoTone className="feedSection_icon" twoToneColor="" />
            <p>jobs</p>
          </div>
          <div className="feedSection_article_icon">
            <FilePdfTwoTone className="feedSection_icon" twoToneColor="" />
            <p>article</p>
          </div>
        </div>
        
      </div>

      {/* Post section of the feed */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))
      ) : (
        <div className="no-post" key={1}>
          <Lottie animationData={NoPost} className="no-post-anim" />
          <p>No posts available</p>
        </div>
      )}
    </div>
  );
};

export default Feed;
