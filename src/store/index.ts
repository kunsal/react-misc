import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './slices/counter-slice';
import candidatesReducer from './slices/candidates-slice';
import questionsReducer from './slices/questions-slice';
import authReducer from './slices/auth-slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
}

const reducers = combineReducers({
    counter: counterReducer,
    candidates: candidatesReducer,
    questions: questionsReducer,
    authData: authReducer
});

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
    reducer: persistedReducer
})