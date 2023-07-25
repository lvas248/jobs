import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import sessionReducer from './features/sessionSlice';
import jobReducer from './features/jobsData/jobSlice';

const store = configureStore({
    reducer:{
        user: userReducer,
        session: sessionReducer,
        job: jobReducer
    }
})

export default store;