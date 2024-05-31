import { Action, createSlice } from "@reduxjs/toolkit";
import { IQuestion } from "../../types/question-types";

type QuestionStateType = {
    data: Array<IQuestion>
}

interface QuestionActionType {
    type: string,
    payload: IQuestion
}

const initialState: QuestionStateType = {
    data: []
}

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        addQuestion: (state, action: QuestionActionType) => {
            // state.data.push(action.payload);
            state.data = [...state.data, action.payload]
        }
    }
})

export const {addQuestion} = questionSlice.actions;
export default questionSlice.reducer;