import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user/userSlice'
import sessionReducer from './features/session.Slice';

const store = configureStore({
    reducer:{
        user: userReducer,
        session: sessionReducer
    }
})

export default store;