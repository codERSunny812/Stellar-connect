import './post.scss';
import {avtar} from '../constants/constant'
import {LikeOutlined , CommentOutlined , ShareAltOutlined , DeploymentUnitOutlined} from '@ant-design/icons'

const Post = ({postData:{id, mediaUrl , content}}) => {
  console.log(mediaUrl)
  return (
   <div className="post_section">

    <div className="postinfo_top">
      <img src={avtar} alt="" />
      <div className="postInfo_about_user">
      <h4>sunny</h4>
      <p>sde@google</p>

      </div>
    </div>

    <p className='post_content'>{content}</p>

    {/* add photo if you want  */}

    
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

export default Post