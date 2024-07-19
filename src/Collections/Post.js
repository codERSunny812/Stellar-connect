import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../constants/Firebase.config';


const addPost = async (post) => {
    try {
        const postId = await addDoc(collection(db, "posts"),post);
        console.log("Document written with ID: ", postId);
        return postId;
    } catch (e) {
        console.error("Error adding document: ", e.message);
        throw e;
    }

}

const getPost = async () => {
    const postsRef = collection(db, "posts");
    const usersRef = collection(db, "users");

    const postSnapshot = await getDocs(postsRef);
    const postData = [];

    for (const postDoc of postSnapshot.docs) {
        const post = postDoc.data();
        const userSnapshot = await getDocs(query(usersRef,where("id", "==", post.userId)));

        if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            post.user = userData;
        }

        postData.push(post);
    }

    return postData;
};


export {addPost , getPost}
