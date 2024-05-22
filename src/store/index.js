import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slices/counter-slice';
import candidatesReducer from './slices/candidates-slice';

export default configureStore({
    reducer: {
        counter: counterReducer,
        candidates: candidatesReducer
    }
})