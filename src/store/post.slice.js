import {getPost as FireBaseGetPost , addPost as FireBaseAddPost} from '../Collections/post.collection'



export const postSlice = (set)=>({
      posts: [], //post initial state
      fetchPosts: async () => {
        const postData = await FireBaseGetPost();
        set(() => ({ posts: postData }));
      },
      addPost: async (newPost,userId) => {
        //upload the data to the firestore
        const postId = await FireBaseAddPost(newPost , userId);
        return postId;
      },

})
