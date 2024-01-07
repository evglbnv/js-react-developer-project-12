import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const fetchChannels = createAsyncThunk(
    'channels/fetchAll', 
    async (token, thunkAPI) => {
    try {
        const response = await axios.get('/api/v1/data', token)
        return response.data.channels
    }
    catch (e) {
        return thunkAPI.rejectWithValue(e.message)
    }
}
)

export default fetchChannels