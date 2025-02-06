import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "../constants/Firebase.config";

export const getFriendList = (userId, cb) => {
  try {
    const friendRef = collection(db, "friends");

    // Query for friendships where userId is either user1 or user2
    const q = query(friendRef, where("userId", "==", userId));
    const q2 = query(friendRef, where("friendId", "==", userId));

    const unsubscribe1 = onSnapshot(q, async (querySnapshot) => {
      const friendIds = querySnapshot.docs.map(doc => doc.data().friendId);
      fetchFriendsData(friendIds, cb);
    });

    const unsubscribe2 = onSnapshot(q2, async (querySnapshot) => {
      const friendIds = querySnapshot.docs.map(doc => doc.data().userId);
      fetchFriendsData(friendIds, cb);
    });

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  } catch (error) {
    console.error("Error fetching friends list:", error);
    return () => { }; // Prevent crashes
  }
};

// Helper function to fetch user details
const fetchFriendsData = async (friendIds, cb) => {
  const userRef = collection(db, "users");

  const friendsData = await Promise.all(
    friendIds.map(async (id) => {
      const userQuery = query(userRef, where("id", "==", id));
      const userSnapshot = await getDocs(userQuery);
      return userSnapshot.docs.map(doc => doc.data())[0] || null;
    })
  );


  cb(friendsData.filter(user => user !== null)); // Remove nulls
};

