import { configureStore } from "@reduxjs/toolkit";
import likesReducer from "./likePost.slice";

const store = configureStore({
    reducer: {
        postLikes: likesReducer,
    },
});

export default store;
