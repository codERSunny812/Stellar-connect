import { collection, addDoc, query, orderBy , getDocs } from 'firebase/firestore';
import { db } from '../constants/Firebase.config';


const addPost = async (post,userId) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            userId: userId,
            content: post.content,
            mediaUrl: post.media,
            createdAt: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
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
