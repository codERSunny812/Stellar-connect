import { setDoc , getDoc , doc } from 'firebase/firestore';
import { db } from '../constants/Firebase.config';



export const addUser = async(user)=>{
try {

  // check that user is present or not
  if (!user) return null;

// This code snippet is used to create a reference(userRef) to a specific document in a Firestore database collection(users).
  const userRef = doc(db, "users", user.id);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
   const ref= await setDoc(userRef, {
      fullName: user.fullName,
      avtar:user.imageUrl
    });
    return ref.id;
  } else {
    return userSnap.id;  
  }
} catch (error) {
  console.log('user can be added to the data base ')  
}
}

export const getUser = async (userId)=>{
  try {
    // create a refrence to this doc
    const userRef = doc(db, 'users', userId);
    // getting the data of the user
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
}