import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import sessionReducer from './features/sessionSlice';
import jobReducer from './features/jobsData/jobSlice';
import savedJobReducer from './features/user/savedJobSlice'

const store = configureStore({
    reducer:{
        user: userReducer,
        session: sessionReducer,
        job: jobReducer,
        savedJob: savedJobReducer
    }
})

export default store;