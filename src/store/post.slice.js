import {
  getPost as FireBaseGetPost,
  addPost as FireBaseAddPost,
} from "../Collections/post.collection";


export const postSlice = (set) => ({
  posts: [],// initial state of the  post
  fetchPosts: async () => {
    const unsubscribe = FireBaseGetPost((posts) => {
      set({ posts }); // ✅ Updates Zustand state correctly
    });

    return unsubscribe;
  }, //function to fetch the post and update the initial state of the post
  addPost: async (newPost, userId) => {
    //upload the data to the firestore
    const postId = await FireBaseAddPost(newPost, userId);
    return postId;
  }, //function to upload the post into the DB
});

