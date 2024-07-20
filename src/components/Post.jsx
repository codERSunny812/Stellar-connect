import "./post.scss";
import {
  LikeOutlined,
  LikeFilled,
  CommentOutlined,
  ShareAltOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import {Shimmer}    from 'react-shimmer'
import {useState} from 'react'


const Post = ({ post, likePost }) => {
  
  // console.log(likePost);

  console.log('the data  of the post array is:');
  console.log(post);
  const [postLiked , setPostLiked] = useState(false);


  const handleLike = ()=>{
    setPostLiked(true);
    likePost(post.id);
  }

  if(!post.id){
    return <Shimmer width={100} height={100}/>;
  }

  return (
    <div className="post_section">
      <div className="postinfo_top">
        <img src={post?.user?.avatar} alt="" style={{ borderRadius: "50%" }} />
        <div className="postInfo_about_user">
          <h4>{post?.user?.fullName}</h4>
          <p>sde@google</p>
        </div>
      </div>
      <p className="post_content">{post?.caption}</p>
      {post?.media && (
        <div className="post_img">
          <img src={post?.media} alt="" />
        </div>
      )}

      <hr />

      <div className="post_section_icon">
        <div className="like_icon_box">
          {
            postLiked ? (
              <>
                <LikeFilled className="icon" style={{color:'blue'}} onClick={handleLike} />
                <p>{post?.likes}</p>
              </>
            ) : (
              <>
                  <LikeOutlined className="icon" onClick={handleLike} />
                  <p>{post?.likes}</p>
              </>
          
            )
          }
          
        </div>

        <div className="comment_icon_box">
          <CommentOutlined className="icon" />
          <p>comment</p>
        </div>

        <div className="share_icon_box">
          <ShareAltOutlined className="icon" />
          <p>share</p>
        </div>

        <div className="repost_icon_box">
          <DeploymentUnitOutlined className="icon" />
          <p>repost</p>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
post:PropTypes.object.isRequired,
likePost:PropTypes.func.isRequired
}

export default Post;
