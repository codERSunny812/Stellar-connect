import { collection, arrayUnion, arrayRemove,  getDocs , getDoc , writeBatch , doc , updateDoc , increment, query, orderBy } from 'firebase/firestore';
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

// function to fetch all the post from the DB
const getPost = async () => {
    try {
        console.log("Fetching posts...");

        const postRef = collection(db, "posts"); // Reference to "posts" collection
        const q = query(postRef, orderBy("createdAt", "desc")); // Sort by latest posts

        const querySnapshot = await getDocs(q); // Use the correct query
        const postData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        console.log(postData)

        return postData;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};

// Get like state for a post and user
const getLikeStateFromDatabase = async (postId, userId) => {
    try {
        // refrence to the post collection to a specfic doc
        const postRef = doc(db, "posts", postId);
        // getting the data of the element
        const postSnap = await getDoc(postRef);
        
        // checking the post like stats
        if (postSnap.exists()) {
            const postData = postSnap.data();
            const likeCount = postData.like || 0;
            const likedUsers = postData.likedUsers || [];
            
            // returning the value 
            return {
                isLiked: likedUsers.includes(userId), // Check if user already liked the post
                likeCount: likeCount,
            };
        } else {
            console.error("No such document!");
            return { isLiked: false, likeCount: 0 };
        }
    } catch (error) {
        console.error("Error fetching like state:", error);
        return { isLiked: false, likeCount: 0 };
    }
};

// Update like count & track user in Firestore
const updateLikeCountInDatabase = async (postId, userId, isLiked) => {
    try {
        const postRef = doc(db, "posts", postId);

        if (isLiked) {
            // Add user to likedUsers array & increment like count
            await updateDoc(postRef, {
                like: increment(1),
                likedUsers: arrayUnion(userId),
            });
        } else {
            // Remove user from likedUsers array & decrement like count
            await updateDoc(postRef, {
                like: increment(-1),
                likedUsers: arrayRemove(userId),
            });
        }

        console.log("Like count updated in Firestore!");
    } catch (error) {
        console.error("Error updating like count:", error);
    }
};





export {addPost , getPost , updateLikeCountInDatabase , getLikeStateFromDatabase}
