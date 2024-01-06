import { createSlice } from "@reduxjs/toolkit";
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const fetchChannels = createAsyncThunk('channels/fetchAll', 
async (token) => {
    const response = await axios.get('/api/v1/data', {headers: token})
    return response.data.channels
}
)

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
            state.channels = action.payload
            state.error = ''
        })

        builder.addCase(fetchChannels.rejected, (state, action) => {
            state.isLoading = false,
            state.error = action.payload
        })
    }
})

export default channelsSlice.reducer

