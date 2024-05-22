import { createSlice } from "@reduxjs/toolkit";

const candidateSlice = createSlice({
    name: 'candidates',
    initialState: [],
    reducers: {
        add: (state, action) => {
            console.log(action.payload);
            state = [...initialState, action.payload]
        }
    }
})

export const {add} = candidateSlice.actions;
export default candidateSlice.reducer;