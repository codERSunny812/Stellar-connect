import './Feed.css';
import { avtar } from '../constants/constant';
import {PictureTwoTone ,ToolTwoTone , FilePdfTwoTone } from '@ant-design/icons'
import Post from './Post';

const Feed = () => {
  return (
  <div className="feed">
    {/*post upload section  */}
    <div className="feedSection_top">
      <div className="feedSection_upload_section">
        <img src={avtar} alt="" />
        <input type="text" name="" id="upload_section_input"  placeholder='Start a post' />
      </div>
      <div className="feedSection_file_select">
          <div className="feedSection_file_select">
            <PictureTwoTone className='feedSection_icon' twoToneColor="red" />
            <p>media</p>

        </div>

        <div className="feedSection_job_icon">
            <ToolTwoTone className='feedSection_icon'
            twoToneColor="green" />
            <p>jobs</p>

        </div>

        <div className="feedSection_article_icon">
            <FilePdfTwoTone className='feedSection_icon'
            twoToneColor="orange" />
            <p>article</p>

        </div>

      </div>
    </div>

    {/* post section of the feed */}
    <Post/>
    
  </div>
  )
}

export default Feed