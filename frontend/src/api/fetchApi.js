/* eslint-disable no-unused-vars */
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

  export const fetchMessageData = createAsyncThunk(
    'messages/fetchInitialData',
    async (token) => {
      const { data } = await axios.get('/api/v1/data', (token));
      return data;
    },
  );