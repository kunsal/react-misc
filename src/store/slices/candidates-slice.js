import { createSlice, current } from "@reduxjs/toolkit";

const candidateSlice = createSlice({
    name: 'candidates',
    initialState: {
        data: []
    },
    reducers: {
        add: (state, action) => {
            console.log(action.payload);
            //console.log(current(state).data);
            state.data.push(action.payload);
            state = [...current(state).data, action.payload]
        }
    }
})

export const {add} = candidateSlice.actions;
export default candidateSlice.reducer;