import './post.scss';
import {avtar} from '../constants/constant'
import {LikeOutlined , CommentOutlined , ShareAltOutlined , DeploymentUnitOutlined} from '@ant-design/icons'

const Post = ({name , bio , description}) => {
  return (
   <div className="post_section">

    <div className="postinfo_top">
      <img src={avtar} alt="" />
      <div className="postInfo_about_user">
      <h4>sunny</h4>
      <p>sde@google</p>

      </div>
    </div>

    <p className='post_content'>this is the content of the  post</p>

    {/* add photo if you want  */}

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