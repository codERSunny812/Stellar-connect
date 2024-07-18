import './Feed.css';
import {PictureTwoTone ,ToolTwoTone , FilePdfTwoTone } from '@ant-design/icons'
import Post from './Post';
import { useState ,useEffect, useContext } from 'react';
import { storage  } from '../constants/Firebase.config'
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage'
import {addPost , getPost} from '../Collections/Post'
import PropTypes from 'prop-types'
import { UserContext } from '../context/UserInfo';


const Feed = ({userId}) => {

  const [posts , setPost] = useState([]);
  const [postCaption, setPostCaption] = useState("");
  const [mediaFile , setMediaFile] = useState(null);

  const {userData} = useContext(UserContext)
  

  console.log(posts);



 
  const fetchPosts = async () => {
    try {
      const postsData = await getPost();
      setPost(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);



  const handleInputChange = (e) => {
    setPostCaption(e.target.value);
  };

  const handleInputKeyPress = async (e) => {
    if (e.key === 'Enter' && postCaption.trim()) {
      await handleSubmit();
    }
  };

  const handleFileChange =async (e) => {
    if (e.target.files[0]) {
      setMediaFile(e.target.files[0]);
    }
  };

  const handleSubmit = async()=>{

    console.log("function execution started")

    let mediaUrl = "";

    if (mediaFile) {
      try {
        // ref creates a reference to the storage location.
        const storageRef = ref(storage, `media/${mediaFile.name}`);
        // uploadBytes uploads the file to Firebase Storage
        await uploadBytes(storageRef, mediaFile);
        // getDownloadURL retrieves the URL of the uploaded file.
        mediaUrl = await getDownloadURL(storageRef);
      } catch (error) {
        console.log(error);
      }
      
    }

    try {
      const newPost ={
        caption: postCaption,
        media: mediaUrl,
        userId:userId,//storing the id of the user
        createdAt: new Date()
      }
      const postId = await addPost(newPost);
      setPost(prevPosts => [...prevPosts, { id: postId, ...newPost }]);
      setPostCaption("");
      setMediaFile(null);
    } catch (error) {
      console.log("error in adding the document")
    }
  }



  return (
  <div className="feed">


    {/*post upload section  */}
    <div className="feedSection_top">
      <div className="feedSection_upload_section">
          <img src={userData.imageUrl} alt="" style={{ borderRadius: '50%',height:'50px' , width:'50px' }} />
        <input type="text" name="" 
        id="upload_section_input"  
        placeholder='Start a post'
        value={postCaption}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress} 
        />
      </div>
      <div className="feedSection_file_select">
          <div className="feedSection_file_select">
            <label>
              <PictureTwoTone className="feedSection_icon" twoToneColor="red" />
              <input type="file" style={{ display: "none" }} onChange={handleFileChange} />
            </label>
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
    {
      posts.length > 0 ? (
      posts.map((posts)=>{
        return(
          <div className="" key={posts.id}>
            <Post posts={posts}  />
          </div>
        )
      })
    ) : (
      <h1> no post uploaded</h1>
    )
    }
    
    
  </div>
  )
}

Feed.propTypes = {
  userId: PropTypes.string,
  user:PropTypes.object

}

export default Feed