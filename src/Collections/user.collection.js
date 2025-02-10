import {
  setDoc,
  getDoc,
  doc,
  collection,
  serverTimestamp,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../constants/Firebase.config";

// function to add the user data into the firestore DB
export const addUser = async (userData) => {
  try {

    // Check if userData is valid
    if (!userData || !userData.id) {
      console.error("Invalid user data");
      return null;
    }

    // taking a refrence to store the data at a specifice place in users collection
    const userRef = doc(db, "users", userData.id); 

    // Check if the user exists in Firestore
    const userSnap = await getDoc(userRef);

    // only add if data is not present
    if (!userSnap.exists()) {
      // if user does not exist then add it
      await setDoc(userRef, {
        id: userData.id,
        fullName: userData.fullName,
        avatar: userData.imageUrl,
        timeStamp: serverTimestamp(),
      });
      // console.log("New user added to Firestore");
    }

    return userSnap.exists() ? userSnap.data() : {id:userData.id};
    // return userData; 
    } catch (error) {
    console.error(`Error adding user to database: ${error.message}`);
    return null;
  }
};

// function to get the data of all the user
export const allUserData =  (id,cb) => {
  try {
    const allUserRef = collection(db, "users"); // make refrence to the whole collection
   
    // dont show the current loggedIn user
    const q = query(
      allUserRef
      , where("id", "!=",id));


  //  getting the data from the firestore in teal time 
    const unsubscribe = onSnapshot(q,(allUserSnapshot)=>{
     const allUserData = allUserSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      cb(allUserData);
    })

    return unsubscribe;
  } catch (error) {
    console.log(`error in fetching the user from the db`);
  }
};

// function to get the data of the specific user 
export const getASpecificUser = async (id) => {
  // console.log(id)
  try {
    const userRef = doc(db,"users",id); //take the refrence to the doc with id
    const userSnapShot = await getDoc(userRef);
    // console.log(userSnapShot)

    if(userSnapShot.empty){
      // console.log("no user found");
      return;
    }

    const userData = await userSnapShot.data();
    // console.log(userData)

    return userData;
  } catch (error) {
    console.error("unable to fetch the data of the user",error.message)
  }
};
