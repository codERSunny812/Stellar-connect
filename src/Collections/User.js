import { setDoc, getDoc, doc, collection , getDocs } from 'firebase/firestore';
import { db } from '../constants/Firebase.config';

export const addUser = async (userData) => {
  try {
    if (!userData) return null;

    const userRef = doc(db, "users", userData.id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      const userIdRef = await setDoc(userRef, {
        id:userData.id,
        fullName: userData.fullName,
        avatar: userData.imageUrl
      });
      return userIdRef;
    } else {
      return userSnap.id;
    }
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
