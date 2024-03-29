/* eslint-disable no-unused-vars */
import { createSlice, createEntityAdapter, createAsyncThunk} from "@reduxjs/toolkit";
import axios from 'axios';
// import { fetchChannels } from "../api/fetchApi";

// const initialState = channelsAdapter.getInitialState({
//     channels: [],
//     loadingStatus: 'notLoaded', 
//     currentChannelId: defaultChannelId,
//     error: null,
// })

export const fetchChannels = createAsyncThunk(
  'channels/fetchInitialData',
  async (token) => {
    const { data } = await axios.get('/api/v1/data', (token));
    return data;
  },
);

const channelsSlice = createSlice({
    name: 'channelsInfo',
    initialState: {
    channels: [],
    currentChannelId: 1,
    processState: {
    status: 'loading',
    error: null,
    },
},
    reducers: {
      setCurrentChannel: (state, {payload}) => {
        state.currentChannelId = payload
      },
      addChannel: (state, {payload}) => {
        state.channels.push(payload)
      },
      deleteChannel: (state, {payload}) => {
        state.channels = state.channels.filter((channel) => channel.id !== payload)
        state.currentChannelId = 1
      },
      renameChannel: (state, { payload }) => {
        const channel = state.channels.find((channel) => channel.id === payload.id);
        channel.name = payload.name;
      },
    },
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

export const selectCurrentChannelId = (state) => state.channelsInfo.currentChannelId

export const selectActiveChannel = (state) => state.channelsInfo.channels
.find((channel) => channel.id === state.channelsInfo.currentChannelId)

export const {actions} = channelsSlice

export default channelsSlice.reducer;
