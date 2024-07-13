import './Feed.css';
import { avtar } from '../constants/constant';
import {PictureTwoTone ,ToolTwoTone , FilePdfTwoTone } from '@ant-design/icons'
import Post from './Post';
import { useState } from 'react';
import addPost from '../Collections/Post';
import {storage , db } from '../constants/Firebase.config'
import {ref,uploadBytes,getDownloadURL } from 'firebase/storage'
import { useEffect } from 'react';
import {collection , getDocs} from 'firebase/firestore'


const Feed = () => {
  const [posts , setPost] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [mediaFile , setMediaFile] = useState(null);

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
      // ref creates a reference to the storage location.
      const storageRef = ref(storage, `media/${mediaFile.name}`);
      // uploadBytes uploads the file to Firebase Storage
      await uploadBytes(storageRef, mediaFile);
      // getDownloadURL retrieves the URL of the uploaded file.
      mediaUrl = await getDownloadURL(storageRef);
    }

    await addPost({
      content:postContent,
      media:mediaUrl,
      createdAt:new Date()
    });

    setPostContent("");
    setMediaFile(null);


  }



  useEffect(() => {
    const fetchPosts = async () => {
      const postsCollection = collection(db, "posts");
      //collection is used to get a refrence to the post collection
      const postsSnapshot = await getDocs(postsCollection);
      //get docs is used to fetch the document from the collection
      const postsData = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPost(postsData);
    };

    fetchPosts();
  }, []);

  // console.log(posts)





  return (
  <div className="feed">
    {/*post upload section  */}
    <div className="feedSection_top">
      <div className="feedSection_upload_section">
        <img src={avtar} alt="" />
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
            <Post postData={posts} />
          </div>
        )
      })
    }
    
    
  </div>
  )
}

export default Feed