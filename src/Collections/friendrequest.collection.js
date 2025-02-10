import {
  collection,
  getDocs,
  query,
  where,
  doc,
  addDoc,
  serverTimestamp,
  deleteDoc,
  setDoc,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { db } from "../constants/Firebase.config";
import toast from "react-hot-toast";

// function to sent friend request
export const sendFriendRequest = async (currentId, targetId) => {
  //prior checking
  if (!currentId || !targetId) {
    console.error("not a valid id");
    return;
  }

  try {
    //make a refrence to the collection
    const friendRequestRef = collection(db, "friendRequest");

    // checking that friend request is already sent or not
    const q = query(
      friendRequestRef,
      where("userId", "in", [currentId, targetId]),
      where("friendId", "in", [currentId, targetId])
    );

    const querySnapShot = await getDocs(q);

    if (!querySnapShot.empty) {
      toast.error("friend request is already sent!!")
      // console.log("friend request has been already sent");
      return;
    }

    // add the new friend
    await addDoc(friendRequestRef, {
      userId: currentId,
      friendId: targetId,
      status: "pending", //status is pending when the request is sent
      timeStamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("unable to add friends", error.message);
  }
};

// function to handle friend request
export const handleFriendRequest = async (
  requestId,
  currentUserId,
  targeteduserId,
  action
) => {
  if (!currentUserId || !targeteduserId) {
    console.log("not a valid id found");
    return;
  }
  try {
    // console.log("inside the handle friend request function");
    // making a refrence to the friend request collection
    const requestRef = doc(db, "friendRequest", requestId);

    const friendCollectionRef = collection(db, "friends");


    // add the friend if the user accept the request
    if (action === "accept") {
      console.log("inside the accept block");
      await setDoc(
        doc(friendCollectionRef, `${currentUserId}_${targeteduserId}`),
        {
          userId: currentUserId,
          friendId: targeteduserId,
          timeStamp: serverTimestamp(),
        }
      );
    }
    //delete the data either the user accept the request or reject the request
    await deleteDoc(requestRef);
  } catch (error) {
    console.error("error in handling the friend request", error.message);
  }
};

export const pendingRequest = async (userId, cb) => {
  // console.log("inside the peding request section")
  if (!userId) {
    // console.log("User ID not found");
    return;
  }

  try {
    // console.log("inside the pending request function:")
    const friendRequestRef = collection(db, "friendRequest");

    // Fetch requests where the user is either the sender or the receiver
    const qSent = query(friendRequestRef, where("userId", "==", userId));  // Sent requests
    const qReceived = query(friendRequestRef, where("friendId", "==", userId));  // Received requests


    // for the sender 
    const unsubscribeSent = onSnapshot(qSent, async (querySnapshot) => {

      const sentRequests = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: "sent",
      }));

      // console.log("sent request:", sentRequests)

      // now get the detail of the user 
      const friendsData = await Promise.all(
        sentRequests.map(async (data) => {

          const userRef = doc(db, "users", data.friendId);
          const userData = await getDoc(userRef)

          return {
            ...data,
            friendName: userData.data()?.fullName, // Add user name
            friendProfilePic: userData.data()?.avatar, // Add profile picture (if available)
          };
        })
      );

      // console.log("friend data to whom we have sent requst:", friendsData)

      cb(friendsData);
    });

    const unsubscribeReceived = onSnapshot(qReceived, async (querySnapshot) => {

      const receivedRequests = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        type: "received",
      }));

      // now get the detail of the user 
      const friendsData = await Promise.all(
        receivedRequests.map(async (data) => {
          const userRef = doc(db, "users", data.userId);
          const userData = await getDoc(userRef)

          return {
            ...data,
            friendName: userData.data()?.fullName, // Add user name
            friendProfilePic: userData.data()?.avatar, // Add profile picture (if available)
          };
        })
      );

      cb(friendsData);
    });

    return () => {
      unsubscribeSent();
      unsubscribeReceived();
    };
  } catch (error) {
    console.error("Error fetching pending requests", error.message);
    return [];
  }
};


// function to delete the request 
export const deleteRequest = async (requestId) => {
  try {
    // talking the refrence of the friedn request collection
    const requestDataRef = doc(db, "friendRequest", requestId);

    // remove the doc from the db
    await deleteDoc(requestDataRef);


  } catch (error) {
    console.error("error in deleting the request:");
    return;
  }
}
