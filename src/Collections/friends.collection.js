import { addDoc, collection , where , getDocs , query, serverTimestamp, onSnapshot } from 'firebase/firestore'
import {db} from '../constants/Firebase.config'


//function to add friends
export const addFriend = async(currentUserId , targetedUserId)=>{
 if(!currentUserId || !targetedUserId){
    console.log("no valid id is found");
    return;
 }
 try {
    //refrence to the connection collection
    const connectionRef = collection(db,"connection");

    //checking that exisiting collection is already present or not
    const exisitingConnectionRef = query(
        connectionRef,
        where("userId","==",currentUserId),
        where("friendId","==",targetedUserId)
    )

    const exisitingConnectionData = await getDocs(exisitingConnectionRef);

    //  only add the data if there is no connection present 
    if(!exisitingConnectionData.empty){
         console.log("friend request is already present");
         return;
    }

    // add the new connection 
    const addDocRef = await addDoc(connectionRef,{
      userId:currentUserId,
      friendsId:targetedUserId,
      status:"pending", //initial time stamp
      timeStamp:serverTimestamp()
    })

    console.log("friend request is sent successfully",addDocRef.id);
 } catch (error) {
    console.log('error in adding friend',error.message)
 }
}


// function to fetch the data of friends in real time
export const fetchFriends = async(currentUserId,setFriends)=>{
const q = query(
    collection(db,"connection"),
    where("userId","==",currentUserId)
)

const friendData = onSnapshot(q,(querySnapshot)=>{
const friends=[];
querySnapshot.forEach((doc)=>{
    friends.push({id:doc.id,...doc.data()});
});
setFriends(friends);
console.log("real time friends updated",friends);
})
return friendData;
}


