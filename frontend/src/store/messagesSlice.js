/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "../api/fetchApi";

const initialState = {
    messages:[],
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers:{
        
    },
    extraReducers:(builder) => {
        
    }
})

const {actions, reducer} = messagesSlice

export default reducer

export const { addMessage } = actions
