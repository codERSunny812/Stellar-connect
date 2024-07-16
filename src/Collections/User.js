import { setDoc , getDoc , doc } from 'firebase/firestore';
import { db } from '../constants/Firebase.config';



export const addUser = async(user)=>{
try {

  if (!user) return null;

  const userRef = doc(db, "users", user.id);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      id: user.id,
      fullName: user.fullName,
    });
    return { ...user, new: true };
  } else {
    return { ...userSnap.data(), new: false };
  }
} catch (error) {
  console.log('user can be added to the data base ')  
}
}