import { collection, arrayUnion,  getDocs , writeBatch , doc } from 'firebase/firestore';
import { db } from '../constants/Firebase.config';


const addPost = async (post,userId) => {
    try {
        console.log("inside add post function:",post,userId);
        const batch = writeBatch(db); //create a batch
        
        // create a post referecne 
        const postRef = doc(collection(db, "posts"));

        console.log("post refrence",postRef);
        
        // add the post to the batch
        batch.set(postRef, post);

        // get the user reference
        const userRef = doc(db, "users",userId);
        
        // update the user collection with the post id
        batch.update(userRef, {
            posts: arrayUnion(postRef.id), // Add post ID to user's post list
        });

        await batch.commit(); // Commit the batch write
        return postRef.id; // Return the post ID
    } catch (error) {
        console.error("Error adding post:", error);
        throw new Error("Post upload failed.");
    }

}


const getPost = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return postData;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};



export {addPost , getPost}
