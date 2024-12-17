import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModal: false,
    modalId: null,
    modalName: "",
    masterid: null
};


const serviceModalSlice = createSlice({
    name: "serviceModalSlice",
    initialState: initialState,
    reducers: {
        openModal: (state, action) => {
            state.showModal = true;
            state.modalId = action.payload.id;
            state.modalName = action.payload.name;
            state.masterid = action.payload.masterid;
            return state

        },
        closeModal: (state, action) => {
            state.showModal = false;
            state.modalId = null;
            state.modalName = "";
            state.masterid = null;
            return state
        }
    }
})

export const { openModal, closeModal } = serviceModalSlice.actions;
export default serviceModalSlice;
