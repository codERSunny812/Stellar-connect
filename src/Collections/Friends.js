import { addDoc, collection , where , getDocs , query } from 'firebase/firestore'
import {db} from '../constants/Firebase.config'


// Function to add a friend
export const addFriend = async (userId, friendId) => {
    try {
        const friendRef = collection(db, "friends");
        const friendDoc = {
            userId,
            friendId
        };
        await addDoc(friendRef, friendDoc);
        console.log(`Friend added: ${friendId}`);
    } catch (error) {
        console.error("Error adding friend: ", error);
    }
};

// Function to get friends of a user
export const getFriends = async (userId) => {
    try {
        const friendsRef = collection(db, "friends");
        const q = query(friendsRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        const friends = querySnapshot.docs.map(doc => doc.data().friendId);
        return friends;
    } catch (error) {
        console.error("Error fetching friends: ", error);
    }
};

// Function to get user data by IDs
export const getUsersByIds = async (userIds) => {
    try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("id", "in", userIds));
        const querySnapshot = await getDocs(q);
        const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return users;
    } catch (error) {
        console.error("Error fetching users by IDs: ", error);
    }
};