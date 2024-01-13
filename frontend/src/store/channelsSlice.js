import { createSlice } from "@reduxjs/toolkit";
import {fetchChannels} from "../api/fetchApi";

const initialState = {
    channels: [],
    isLoading: false, 
    currentChannelId: 1,
    currentChannel:{},
    error: '',
}

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchChannels.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(fetchChannels.fulfilled, (state,action) => {
            state.isLoading = false,
            state.channels = action.payload,
            state.error = ''
        })

        builder.addCase(fetchChannels.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })
    }
})

const {reducer} = channelsSlice;
export default reducer;
