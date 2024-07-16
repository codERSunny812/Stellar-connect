import './Feed.css';
import {PictureTwoTone ,ToolTwoTone , FilePdfTwoTone } from '@ant-design/icons'
import Post from './Post';
import { useState ,useEffect } from 'react';
import { storage  } from '../constants/Firebase.config'
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage'
import {addPost , getPost} from '../Collections/Post'
import {useUser} from '@clerk/clerk-react'

const Feed = ({userData}) => {
  const [posts , setPost] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [mediaFile , setMediaFile] = useState(null);
  const {user}= useUser();



  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsData = await getPost();
        setPost(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  });


  const handleInputChange = (e) => {
    setPostContent(e.target.value);
  };

  const handleInputKeyPress = async (e) => {
    if (e.key === 'Enter' && postContent.trim()) {
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
        content: postContent,
        media: mediaUrl,
        createdAt: new Date()
      }
      const docId = await addPost(newPost);

      console.log(docId);

      // update the post array after adding the new post 
      setPost(prevPosts => [{ id: docId, ...newPost }, ...prevPosts]);
      setPostContent("");
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
          <img src={user.imageUrl} alt="" style={{ borderRadius: '50%' }} />
        <input type="text" name="" 
        id="upload_section_input"  
        placeholder='Start a post'
        value={postContent}
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
      posts.map((posts)=>{
        return(
          <div className="" key={posts.id}>
            <Post postData={posts} userData={userData} />
          </div>
        )
      })
    }
    
    
  </div>
  )
}

export default Feed