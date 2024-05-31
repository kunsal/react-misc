import { createSlice } from "@reduxjs/toolkit";

type CounterStateType = {
    value: number
}

const initialState: CounterStateType = {value: 0};

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value++;
        },
        decrement: state => {
            if (state.value === 0) {
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