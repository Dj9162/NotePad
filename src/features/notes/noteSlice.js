import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useEffect } from "react";

const initialState = {
    notes: [],
    error: null,
    count: 0
}

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        setNotes(state, action) {
            state.notes = action.payload;
        },
        removeNoteSuccess(state, action) {
            state.notes = state.notes.filter(note => note._id !== action.payload);
        },
        setError(state, action) {
            state.error = action.payload;
        }
    }
});

export const { removeNoteSuccess, setError } = noteSlice.actions;

export const removeNote = (id) => async (dispatch) => {
    try {
        await axios.delete(`https://notepad-backend-027c.onrender.com/api/delete-note/${id}`);
        dispatch(removeNoteSuccess(id));
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const getAllNotes = await axios.get('https://notepad-backend-027c.onrender.com/api/get-all-notes');
export default noteSlice.reducer;
