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
    reducers:{
        addMessage(state, action) {
            state.messages.push(action.payload)
        },
    },
    extraReducers:(builder) => {
        builder.addCase(fetchMessages.pending, (state)=> {
            state.isLoading = true
        })
        builder.addCase(fetchMessages.fulfilled, (action, state) => {
            state.isLoading = false,
            state.messages = action.payload,
            state.error = ''
        })

        builder.addCase(fetchMessages.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        } )
    }
})

const {actions, reducer} = messagesSlice

export default reducer

export const { addMessage } = actions
