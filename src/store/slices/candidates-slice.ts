import { createSlice } from "@reduxjs/toolkit";
import { Candidate } from '../../types/candidate-types';

type CandidatSliceType = {
    data: Array<Candidate>
}

type CandidateActionType = {
    type: string,
    payload: Candidate
}

const initialState: CandidatSliceType = {data:  []};

const candidateSlice = createSlice({
    name: 'candidates',
    initialState,
    reducers: {
        add: (state, action: CandidateActionType) => {
            state.data = [...state.data, action.payload]
        }
    }
})

export const {add} = candidateSlice.actions;
export default candidateSlice.reducer;