import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages } from "../api/fetchApi";

const initialState = {
    messages:[],
    isLoading: false,
    error: '',
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.addCase(fetchMessages.pending, (state)=> {
            state.isLoading = true
        })
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.isLoading = false,
            state.messages = action.payload.messages,
            state.error = ''
        })

        builder.addCase(fetchMessages.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        } )
    }
})

const {reducer} = messagesSlice

export default reducer