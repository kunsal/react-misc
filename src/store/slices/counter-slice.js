import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: (state) => {
            state.value++;
        },
        decrement: state => {
            if (state.value == 0) {
                state.value = 0;
            } else {
                state.value--
            }
            
        },
        incrementByValue: (state, action) => {
            state.value += parseInt(action.payload)
        }
    }
})

export const {increment, decrement, incrementByValue} = counterSlice.actions;
export default counterSlice.reducer;