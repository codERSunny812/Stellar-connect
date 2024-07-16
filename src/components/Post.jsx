import './post.scss';
import {LikeOutlined , CommentOutlined , ShareAltOutlined , DeploymentUnitOutlined} from '@ant-design/icons'
import PropTypes from 'prop-types'
import {useUser} from '@clerk/clerk-react'

const Post = ({postData:{id, mediaUrl , content},userData}) => {
  // console.log(id);

  const {user} = useUser();
 
  return (
   <div className="post_section">

    <div className="postinfo_top">
      <img src={user.imageUrl} alt="" style={{borderRadius:'50%'}} />
      <div className="postInfo_about_user">
      <h4>{userData.firstName}</h4>
      <p>sde@google</p>

      </div>
    </div>

    <p className='post_content'>{content}</p>   
      {/* Conditionally render the image */}
      {mediaUrl && (
        <div className="post_img">
          <img src={mediaUrl} alt="" />
        </div>
      )}
    <hr />

    <div className="post_section_icon">
      <div className="like_icon_box">
          <LikeOutlined className='icon' />
          <p>like</p>
      </div>

      <div className="comment_icon_box">
          <CommentOutlined className='icon' />
          <p>comment</p>

      </div>

      <div className="share_icon_box">
          <ShareAltOutlined className='icon' />
          <p>share</p>
      </div>

      <div className="repost_icon_box">
          <DeploymentUnitOutlined className='icon' />
          <p>repost</p>

      </div>

    </div>



    

   </div>
  )
}

Post.propTypes = {
  id:PropTypes.string,
  mediaUrl:PropTypes.string,
  postData:PropTypes.object,
  content:PropTypes.string
}



export default Post