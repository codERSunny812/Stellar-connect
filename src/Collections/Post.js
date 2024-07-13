import { collection, addDoc } from 'firebase/firestore';
import { db } from '../constants/Firebase.config';


const addPost = async (post) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            content: post.content,
            mediaUrl: post.media,
            createdAt: new Date(),
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }

}

export default addPost;