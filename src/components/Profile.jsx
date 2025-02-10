import useStore from "../store/Store";
import "./profile.css";
import { avtar, banner } from "../constants/constant.js";
import { MdModeEditOutline } from "react-icons/md";
import { fileUpload, resizeFile } from "../Service/file.upload";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { db } from "../constants/Firebase.config.js";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const Profile = () => {
  const { userData, posts, friends } = useStore((state) => state);
  const [model, setModel] = useState(false);
  const [headline, setHeadline] = useState("");
  const [college, setCollege] = useState("");
  const [bio, setBio] = useState("");

  const handleFileClick = () => {
    document.getElementById("fileInput").click();
  };

  // Function to handle file selection
  const handleFileChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      await uploadBanner(file);
    }
  };

  // Function to upload the banner image and update Firestore
  const uploadBanner = async (file) => {
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          // Resize the image
          const resizedImage = await resizeFile(file);
          // Upload to Cloudinary
          const bannerUrl = await fileUpload(resizedImage);

          // Get the user document reference
          const userDocRef = doc(db, "users", userData.id);

          // Update Firestore with the new banner URL
          await updateDoc(userDocRef, { bannerImage: bannerUrl });

          resolve("Banner updated successfully! 🎉");
        } catch (error) {
          reject("Failed to update the banner. 😞");
          console.error("Error uploading banner:", error.message);
        }
      }),
      {
        loading: "Updating banner...",
        success: "Banner updated successfully!",
        error: "Error updating banner",
      }
    );
  };

  // Function to update user profile in Firestore
  const updateUserProfile = async () => {
    if (!userData?.id) {
      toast.error("User ID is missing. Please try again.");
      return;
    }

    if (
      (!headline,
      !college,
      !bio || headline.length == 0 || college.length == 0 || bio.length == 0)
    ) {
      toast.error("some field is empty");
      return;
    }

    const userDocRef = doc(db, "users", userData.id);

    try {
      await updateDoc(userDocRef, {
        headline: headline,
        school: college,
        bio: bio,
      });

      toast.success("Profile updated successfully! 🎉");
      setModel(false); // Close the modal after update
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-left"></div>
      <div className="profile-mid">
        <div className="mid-top">
          <div className="banner">
            <img src={userData?.bannerImage || banner} alt="" />
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <MdModeEditOutline
              className="edit-icon"
              onClick={handleFileClick}
            />
          </div>
          <img src={userData?.avatar || avtar} className="profile-img" alt="user image" />

          {/* user  confugration  */}
          <div className="profile-info">
            <div className="profile-mid-left">
              <h1>{userData?.fullName || "john doe"}</h1>
              <p className="profile-headline">
                {
                  userData?.headline || "user headline"
                }
              </p>

              <p className="profile-location">
                Lucknow, Uttar Pradesh, India{" "}
                <span className="contact-info">Contact info</span>
              </p>

              <span className="contact-info" >{friends.length}+ connections</span>

              <div className="profile-btn">
                <button type="button" className="profile-btn-btn">
                  open to
                </button>
                <button type="button" className="profile-btn-btn btn-btn">
                  enhance profile
                </button>
              </div>
            </div>

            <div className="profile-mid-right">
              <MdModeEditOutline
                className="profile-edit-icon"
                onClick={() => setModel(!model)}
              />
              <p>
                {
                  userData?.school || "user school"
                }</p>
            </div>
          </div>
        </div>

        {/* about the user  */}
        <div className="about-user">
          <div className="about-top">
            <h2>about me</h2>
            <MdModeEditOutline fontSize={24} />
          </div>

          <p>
            {userData?.bio || "user bio"}
          </p>
        </div>

        {/* model  */}
        {model && (
          <div className="profile-modal-section">
            <div className="profile-model-content">
              <div className="profile-model-top">
                <h1>update profile</h1>
                <RxCross2
                  className="cross-icon"
                  onClick={() => setModel(!model)}
                />
              </div>
              {/* headline input */}
              <input
                type="text"
                placeholder="write your headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
              />
              {/* school  */}
              <input
                type="text"
                placeholder="enter your college"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
              />

              {/* bio of the user  */}
              <textarea
                placeholder="enter your bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>

              <div className="profile-button">
                <button
                  type="button"
                  className="profile-update-btn"
                  onClick={updateUserProfile}
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="profile-right"></div>
    </div>
  );
};

export default Profile;
