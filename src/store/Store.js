// store.js
import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { collection, getDocs , query ,where } from 'firebase/firestore';
import { db } from '../constants/Firebase.config'; // Ensure you have Firebase config correctly set up
import {getPost as FireBaseGetPost , addPost as FireBaseAddPost} from '../Collections/Post'

const useStore = create(
  persist(
    (set) => ({
      posts: [],
      fetchPosts: async () => {

        const postData = await FireBaseGetPost();
  
        set(() => ({ posts: postData }));
      },
      addPost: async (newPost) => {
        const postId = await FireBaseAddPost(newPost);
        const userSnapshot = await getDocs(query(collection(db,"users"), where("id", "==", newPost.userId)));

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          newPost.user = userData;
        }

        set((state) => ({
          posts: [...state.posts, { id: postId, ...newPost }],
        }));
      },
      likePost: (postId) =>
        set((state) => ({
          posts: state.posts.map((post) =>
            post.id === postId ? { ...post, likes: post.likes + 1 } : post
          ),
        })),
    }),
    { name: 'posts-storage' } // Unique name for the local storage item
  )
);

export default useStore;
