import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUser, removeUser } from './userSlice'
import { loadSavedJobs, removeSavedJobs } from "./savedJobSlice";


//create signup async
export const signupUser = createAsyncThunk(
    'signup/user',
    async(obj, { rejectWithValue })=>{
        const response = await fetch('/signup',{
            method:'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await response.json()

        if(response.ok){

            return data
        }
        return rejectWithValue(data)
    }
)
//create login async
export const loginuser = createAsyncThunk(
    'login/session',
    async(obj, { dispatch, rejectWithValue } )=>{
        const response = await fetch('/login',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(obj)
        })

        const data = await response.json()

        if(response.ok){ 
            
            const { username, email, email_verified, saved_jobs } = data
            
            dispatch(addUser({ username, email, email_verified}))

            dispatch(loadSavedJobs(saved_jobs))
            
            return data
        }
        return rejectWithValue(data)
    }
)
//create logout async
export const logoutSession = createAsyncThunk(
    'logout/session',
    async( _,{ dispatch, rejectWithValue })=>{
        const response = await fetch('/logout',{
            method: 'DELETE'
        })

        const data = await response

        if(response.ok){
            dispatch(removeUser())
            dispatch(removeSavedJobs())
            return
        }
        return rejectWithValue(data)

    }
)
//create refresh async
export const refreshSession = createAsyncThunk(
    'refresh/session',
    async( _,{ dispatch, rejectWithValue } )=>{
        const response = await fetch('/me')

        const data = await response.json()

        if(response.ok){ 

            const { username, email, email_verified, saved_jobs } = data
            
            dispatch(addUser({ username, email, email_verified}))

            dispatch(loadSavedJobs(saved_jobs))

            return data
        }
        return rejectWithValue(data)
    }
)

const initialState = {
    loggedIn: false,
    status: 'idle',
    error: null
}

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers:{
        login: ( state )=>{
            state.loggedIn = true
        },
        logout: ( state )=>{
            state.loggedIn = false
        },
        resetErrors: ( state )=>{
            state.error = null
        }

    }, 
    extraReducers: ( builder ) =>{
        builder
            .addCase(signupUser.pending, state =>{
                state.status = 'pending'
                state.error = null
                state.loggedIn = false
            })
            .addCase( signupUser.rejected, (state, action) =>{
                state.status = 'idle'
                state.error = action.payload.errors
                state.loggedIn = false
            })
            .addCase( signupUser.fulfilled, (state) =>{
                state.status = 'idle'
                state.error = null
                state.loggedIn = false
            })

            .addCase( loginuser.pending, state => {
                state.loggedIn = false
                state.status = 'pending'
                state.error = null
            })
            .addCase( loginuser.rejected, (state,action) => {
                state.loggedIn = false
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( loginuser.fulfilled, state => {
                state.loggedIn = true
                state.status = 'idle'
                state.error = null
            })
            .addCase( refreshSession.pending, state => {
                state.loggedIn = false
                state.status = 'pending'
                state.error = null
            })
            .addCase( refreshSession.rejected, (state,action) => {
                state.loggedIn = false
                state.status = 'idle'
                // state.error = action.payload
            })
            .addCase( refreshSession.fulfilled, state => {
                state.loggedIn = true
                state.status = 'idle'
                state.error = null
            })
            .addCase( logoutSession.pending, state => {
                state.status = 'pending'
                state.error = null
            })
            .addCase( logoutSession.rejected, (state,action) => {
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( logoutSession.fulfilled, state => {
                state.loggedIn = false
                state.status = 'idle'
                state.error = null
            })

    }
})

export const { login, logout, resetErrors } = sessionSlice.actions
export default sessionSlice.reducer