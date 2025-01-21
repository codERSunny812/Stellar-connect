import { setDoc, getDoc, doc, collection , getDocs, updateDoc , arrayUnion } from 'firebase/firestore';
import { db } from '../constants/Firebase.config';


// function to handle user login 
export const addUser = async (userData) => {
  try {

    // Check if userData is valid
    if (!userData || !userData.id) {
      console.error("Invalid user data");
      return null;
    }

    // Reference the user document in Firestore
    const userRef = doc(db, "users", userData.id);

    // Check if the user exists in Firestore
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // if user does not exist then add it 
      await setDoc(userRef, {
        id:userData.id,
        fullName: userData.fullName,
        avatar: userData.imageUrl
      });
      console.log("New user added to Firestore");
    } else {
      console.log("User already exists in Firestore");
    }

    return userSnap.exists() ? userSnap.data() : {id:userData.id};

  } catch (error) {
    console.log(`Error adding user to database: ${error.message}`);
    return null;
  }
};

export const getUser = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      console.log('User not found in Firestore');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};


export const allUserData = async()=>{
try {
  const allUserRef = collection(db, "users");
  const allUserSnapshot = await getDocs(allUserRef);
  // Extract data from snapshot
  const allUserData = allUserSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  return allUserData;
} catch (error) {
  console.log(`error in fetching the user from the db`)
}

}


export const updateUser = async(userId ,postId)=>{
try {

  console.log("inside the update user function")
  if(!userId || !postId){
    throw new Error('Invalid userId or postId');
  }

  
  //refrence to the user document
  const userRef = doc(db, "users", userId);

  console.log("user ref",userRef);

  // Fetch the user document
  const userSnap = await getDoc(userRef);

  console.log("user snap",userSnap);

  if (!userSnap.exists()) {
    throw new Error('User not found in Firestore');
  }

  // Update the posts array in the user document
  await updateDoc(userRef, {
    posts: arrayUnion(postId) // Add the post ID to the posts array
  });

  console.log('Post ID added to the user document successfully');

} catch (error) {
  console.error('Error updating user posts:', error.message);
  throw error;
}
}