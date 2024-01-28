/* eslint-disable no-unused-vars */
import {createSlice, createSelector, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { fetchMessageData } from '../api/fetchApi';


const messagesSlice = createSlice({
    name: 'messagesInfo',
    initialState: {
        messages: [],
        currentChannelMessages: []
    },
    reducers: {
        sendMessage: (state, {payload}) => {
            state.messages.push(payload)
        },
        addCurrentChannelMessages: (state, {payload}) => {
            state.currentChannelMessages = [...state.messages]
            state.currentChannelMessages = state.currentChannelMessages.filter(message => message.channelID === payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMessageData.fulfilled, (state, action) => {
            state.messages = action.payload.messages
        })
    },
})
export const selectMessages = (state) => state.messagesInfo.messages
export const currentChannelMessages = (state) => state.messagesInfo.currentChannelMessages

export const { actions } = messagesSlice

export default messagesSlice.reducer