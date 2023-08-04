import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import sessionReducer from './slices/sessionSlice';
import jobReducer from './slices/jobSlice';
import savedJobReducer from './slices/savedJobSlice'

const store = configureStore({
    reducer:{
        user: userReducer,
        session: sessionReducer,
        job: jobReducer,
        savedJob: savedJobReducer
    }
})

export default store;