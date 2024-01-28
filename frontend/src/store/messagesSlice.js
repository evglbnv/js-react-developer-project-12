/* eslint-disable no-unused-vars */
import {createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { fetchMessageData } from '../api/fetchApi';


const messagesSlice = createSlice({
    name: 'messagesInfo',
    initialState: {
        messages: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMessageData.fulfilled, (state, action) => {
            state.messages = action.payload.messages
        })
    },
})
export const selectMessages = (state) => state.messagesInfo.messages

export default messagesSlice.reducer