/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

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
            state.isOpen = false;
            state.type = null;
            state.data = null;
        }
    }
})

export const modalSelectors = {
    getState: (state) => state.modalInfo,
    isOpen: (state) => state.modalInfo.isOpen,
    getType: (state) => state.modalInfo.type,
    getData: (state) => state.modalInfo.data
}

export const modalActions = modalSlice.actions;

export default modalSlice.reducer