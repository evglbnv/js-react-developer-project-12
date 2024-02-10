/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import channelsSlice from "./channelsSlice";

const initialState = {
    isOpen: false,
    type: null,
    data: null
}

const modalSlice = createSlice({
    name: 'modalInfo',
    initialState,
    reducers: {
        showModal: (state, {payload}) => {
            state.isOpen = true,
            state.type = payload.type,
            state.data = payload.data
        },
        hideModal: (state) => {
            state.isOpened = false;
            state.type = null;
            state.data = null;
        }
    }
})

export const modalSelectors = {
    getState: (state) => state.modal,
    isOpen: (state) => state.modal.isOpen,
    getType: (state) => state.modal.type,
    getData: (state) => state.modal.data
}

export const { actions } = channelsSlice

export default modalSlice.reducer