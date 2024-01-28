/* eslint-disable no-unused-vars */
import { createSlice, createEntityAdapter, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
import { fetchChannels } from "../api/fetchApi";


const defaultChannelId = 1;

// const initialState = channelsAdapter.getInitialState({
//     channels: [],
//     loadingStatus: 'notLoaded', 
//     currentChannelId: defaultChannelId,
//     error: null,
// })

const channelsSlice = createSlice({
    name: 'channelsInfo',
    initialState: {
    channels: [],
    currentChannelId: null,
    processState: {
    status: 'loading',
    error: null,
    },
},
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchChannels.pending, (state) => {
          state.processState.status = 'loading';
          state.processState.error = null;
        })
        .addCase(fetchChannels.fulfilled, (state, { payload }) => {
            state.channels = payload.channels;
            state.currentChannelId = payload.currentChannelId;
            state.processState.status = 'success';
          })
        .addCase(fetchChannels.rejected, (state, { error }) => {
          state.processState.status = 'error';
          state.processState.error = error.message;
        });
    },
})

// export const selectChannels = (state) => state.channelsInfo.channels;

export const selectChannels = (state) => state.channelsInfo.channels;

export default channelsSlice.reducer;
