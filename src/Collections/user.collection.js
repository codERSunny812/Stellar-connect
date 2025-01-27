import { setDoc, getDoc, doc, collection , getDocs } from 'firebase/firestore';
import { db } from '../constants/Firebase.config';


// function to handle user login 
export const addUser = async (userData) => {
  try {
    // console.log("inside the add user to firestore function:")
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
      console.error("User already exists in Firestore");
    }

    // return userSnap.exists() ? userSnap.data() : {id:userData.id};
    return userData; //return the id of the user

  } catch (error) {
    console.log(`Error adding user to database: ${error.message}`);
    return null;
  }
};

// function to get the data of the user 
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

// function to get the data of all the user 
export const allUserData = async()=>{
try {
  // console.log("inside the function to get the data of all the user from the db")
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

export const getASpecificUser = async()=>{
  
}
