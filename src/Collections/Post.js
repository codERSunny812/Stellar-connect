import { collection, addDoc, query, orderBy , getDocs } from 'firebase/firestore';
import { db } from '../constants/Firebase.config';


const addPost = async (post) => {
    try {
        const postId = await addDoc(collection(db, "posts"),post);
        console.log("Document written with ID: ", postId);
        return postId;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw e;
    }

}

const getPost =async ()=>{
try {   
    const postsCollection = collection(db, "posts");
    //query func to order the post by created date
    const postsQuery = query(postsCollection, orderBy("createdAt", "desc"));
    //get docs is used to fetch the document from the collection
    const postsSnapshot = await getDocs(postsQuery);

    const postsData = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return postsData;
    
} catch (error) {
  console.log("error in  fetching the data from the front end")  
}
}


export {addPost , getPost}
