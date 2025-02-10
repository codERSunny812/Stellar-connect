import "./post.css";
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  ShareAltOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { Shimmer } from "react-shimmer";
import LazyLoad from "react-lazyload";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike, setInitialState } from "../Redux Store/likePost.slice";
import {
  updateLikeCountInDatabase,
  getLikeStateFromDatabase,
} from "../Collections/post.collection";
import { useEffect } from "react";
import useStore from "../store/Store.js";

const Post = ({ post }) => {
  console.log(post)
  const dispatch = useDispatch();
  const { userData } = useStore((state) => state);

  // Load initial like state from Firestore
  useEffect(() => {
    const unsubscribe = getLikeStateFromDatabase(
      post.id,
      userData.id,
      (likeState) => {
        dispatch(setInitialState(likeState)); // ✅ Updates Redux store in real-time
      }
    );

    return () => {
      if (typeof unsubscribe === "function") {
        unsubscribe(); // Cleanup function to prevent memory leaks
      }
    };
  }, [post.id, dispatch, userData.id]);

  // Get the like state for the current post
  const likeData = useSelector((state) => state.postLikes.likes[post.id]) || {
    isLiked: false,
    likeCount: 0,
  };

  const handleLike = async () => {
    const newIsLiked = !likeData.isLiked; // Toggle like state
    dispatch(toggleLike(post.id)); // Update Redux state
    await updateLikeCountInDatabase(post.id, userData.id, newIsLiked); // Update Firestore
  };

  if (!post.id) {
    return <Shimmer width={100} height={100} />;
  }

  return (
    <div className="post_section">
      {/* Top section of the post */}
      <div className="postinfo_top">
        <img
          src={post?.uploadUser?.avatar || post?.uploadUser?.imageUrl }
          alt=""
          style={{ borderRadius: "50%" }}
        />
        <div className="postInfo_about_user">
          <h4>{post?.uploadUser?.fullName}</h4>
          <p>
            {new Date(post?.createdAt?.seconds * 1000).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Post caption */}
      <p className="post_content">{post?.caption}</p>

      {post?.media && (
        <div className="post_img">
          <LazyLoad height={200} offset={100} once>
            <img src={post?.media} alt="" />
          </LazyLoad>
        </div>
      )}

      {/* Post Stats Info */}
      <div className="PostStatsInfo">
        <div className="likePostInfo">
          <span className="likePostCount">{likeData.likeCount}</span>
          <p className="likePostCount">likes</p>
        </div>

        <div className="commentPostInfo">
          <span className="PostCommentCount">12</span>
          <p className="PostCommentCount">comments</p>
        </div>
      </div>

      <hr className="post_content_line" />

      {/* Like & Other Icons */}
      <div className="post_section_icon">
        <div className="like_icon_box" onClick={handleLike}>
          {likeData.isLiked ? (
            <LikeFilled className="icon" style={{ color: "blue" }} />
          ) : (
            <LikeOutlined className="icon" />
          )}
        </div>

        <div className="comment_icon_box">
          <CommentOutlined className="icon" />
        </div>

        <div className="share_icon_box">
          <ShareAltOutlined className="icon" />
        </div>

        <div className="repost_icon_box">
          <DeploymentUnitOutlined className="icon" />
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
