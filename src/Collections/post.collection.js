import { collection, arrayUnion,  getDocs , getDoc , writeBatch , doc , updateDoc , increment } from 'firebase/firestore';
import { db } from '../constants/Firebase.config';


const addPost = async (post,userId) => {
    try {
        // console.log("inside add post function:",post,userId);
        const batch = writeBatch(db); //create a batch
        
        // create a post referecne 
        const postRef = doc(collection(db, "posts"));

        // console.log("post refrence",postRef);
        
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
        // console.log("inside the fetch post function")
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

const updateLikeCountInDatabase = async (postId, isLiked) => {
    try {
        const postRef = doc(db, "posts", postId);
        await updateDoc(postRef, {
            like: increment(isLiked ? 1 : -1), // Increment or decrement
        });
        console.log("Like count updated in database!");
    } catch (error) {
        console.error("Error updating like count:", error);
    }
};


const getLikeStateFromDatabase = async (postId) => {
    try {
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists()) {
            const postData = postSnap.data();
            const likeCount = postData.like || 0; // Default to 0 if missing
            return { isLiked: false, likeCount }; // Assuming no per-user like tracking
        } else {
            console.error("No such document!");
            return { isLiked: false, likeCount: 0 };
        }
    } catch (error) {
        console.error("Error fetching like state:", error);
        return { isLiked: false, likeCount: 0 };
    }
};



export {addPost , getPost , updateLikeCountInDatabase , getLikeStateFromDatabase}
