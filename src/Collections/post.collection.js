import {
  collection,
  arrayUnion,
  arrayRemove,
  writeBatch,
  doc,
  updateDoc,
  increment,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../constants/Firebase.config";

// function to add the post to the DB
const addPost = async (post, userId) => {
  try {
    const batch = writeBatch(db); //create a batch

    // create a post referecne
    const postRef = doc(collection(db, "posts"));

    // add the post to the batch
    batch.set(postRef, post);

    // get the user reference
    const userRef = doc(db, "users", userId);

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
};

// function to fetch all the post from the DB
const getPost = async (cb) => {
  try {
    const postRef = collection(db, "posts"); // Reference to "posts" collection
    const q = query(postRef, orderBy("createdAt", "desc")); // Sort by latest posts

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      cb(posts); // Pass updated posts to Zustand store
    });

    return unsubscribe;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

// Get like state for a post and user
const getLikeStateFromDatabase = async (postId, userId, callback) => {
  try {
    //refrence to the post collection to a specific doc
    const postRef = doc(db, "posts", postId);

    const unsubscribe = onSnapshot(postRef, (postSnap) => {
      if (postSnap.exists()) {
        const postData = postSnap.data();
        const likeCount = postData.like || 0;
        const likedUsers = postData.likedUsers || [];

        // Callback to update Redux store with real-time data
        callback({
          postId,
          isLiked: likedUsers.includes(userId),
          likeCount: likeCount,
        });
      } else {
        console.error("No such document!");
      }
    });
    return unsubscribe;
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
  } catch (error) {
    console.error("Error updating like count:", error);
  }
};

export {
  addPost,
  getPost,
  updateLikeCountInDatabase,
  getLikeStateFromDatabase,
};
