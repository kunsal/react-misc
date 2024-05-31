import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        data: {},
        tokens: {}
    },
    reducers: {
        setUserData: (state, action) => {
            state.data = action.payload
        },
        setTokens: (state, action) => {
            state.tokens = action.payload
        }
    }
})

export const { setUserData, setTokens } = AuthSlice.actions;
export default AuthSlice.reducer;