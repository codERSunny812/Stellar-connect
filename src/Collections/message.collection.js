import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast"
import { db } from "../constants/Firebase.config";


// function to send message 
export const sendMessage = async (senderId, receiverId , messageText)=>{
if(!messageText || messageText.length == 0){
    toast.error("message can be empty");
    return false;
}
try {
    
    const messagesRef = collection(db, "messages");

    await addDoc(messagesRef, {
        participants: [senderId, receiverId],
        senderId,
        receiverId,
        message: messageText,
        timestamp: serverTimestamp(),
    });    
    return true;
} catch (error) {
    console.error("Error sending message:", error);
    return false;
}
}

// Real-time listener for messages
export const listenForMessages = (userId, friendId, setMessages) => {
    try {
        // console.log("inside the listen  message function:")
        const messagesRef = collection(db, "messages");
        const q = query(
            messagesRef,
            where("participants", "array-contains", userId),
            orderBy("timestamp", "asc")
        );

        // Listen for real-time updates
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(msg => msg.participants.includes(friendId));

            setMessages(messages);
        });

        return unsubscribe; // Allows cleanup
    } catch (error) {
        console.error("Error fetching real-time messages:", error);
    }
};