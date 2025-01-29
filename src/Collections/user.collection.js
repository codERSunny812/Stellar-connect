import { setDoc, getDoc, doc, collection , getDocs , serverTimestamp   } from 'firebase/firestore';
import { db } from '../constants/Firebase.config';



// function to add the user data into the firestore DB
export const addUser = async (userData) => {
  try {
    // console.log("inside the add user to firestore function:")
    // Check if userData is valid
    if (!userData || !userData.id) {
      console.error("Invalid user data");
      return null;
    }

    // taking a refrence to store the data at a specifice place in users collection
    const userRef = doc(db, "users", userData.id); //make refrence to a doc

    // Check if the user exists in Firestore
    const userSnap = await getDoc(userRef);

    // only add if data is not present 
    if (!userSnap.exists()) {
      // if user does not exist then add it 
      await setDoc(userRef, {
        id:userData.id,
        fullName: userData.fullName,
        avatar: userData.imageUrl,
        timeStamp:serverTimestamp()
      });
      console.log("New user added to Firestore");
    } 

    // return userSnap.exists() ? userSnap.data() : {id:userData.id};
    return userData; //return the id of the user

  } catch (error) {
    console.log(`Error adding user to database: ${error.message}`);
    return null;
  }
};

// function to get the data of all the user 
export const allUserData = async()=>{
try {
  // console.log("inside the function to get the data of all the user from the db")
  const allUserRef = collection(db, "users"); // make refrence to the whole collection
  // dont show the current loggedIn user 
  // const q = Query(allUserRef , where())
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
