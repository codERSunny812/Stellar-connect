import { createSlice } from "@reduxjs/toolkit";

const likesSlice = createSlice({
    name: "postLikes",
    initialState: {
        likes: {},// Structure: { postId: { isLiked: false, count: 0 } }
    },
    reducers: {
        setInitialState: (state,action)=>{
            // console.log("inside the setInitialState function")
            // console.log(action.payload)
           const {postId , isLiked , likeCount} = action.payload;
        //    console.log("the value inside setInitialState:",isLiked,likeCount)
           state.likes[postId] = {isLiked , likeCount}
        },
        toggleLike: (state, action) => {
            const postId = action.payload;
            if (state.likes[postId]) {
                state.likes[postId].isLiked = !state.likes[postId].isLiked;
                state.likes[postId].likeCount += state.likes[postId].isLiked ? 1 : -1;
            } else {
                state.likes[postId] = { isLiked: true, likeCount: 1 };
            }
        },
    },
});

export const { toggleLike , setInitialState } = likesSlice.actions;
export default likesSlice.reducer;
