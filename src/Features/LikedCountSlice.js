import {createSlice} from '@reduxjs/toolkit'

export const initialValue = {
    // like on the post is initally 0
    likeCount:0
}

export const likeCountSlice=createSlice({
    // name of the slice of the store
    name:'likeCount',
    initialValue,
})