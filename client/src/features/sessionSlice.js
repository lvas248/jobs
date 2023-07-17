import { createSlice, createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { addUser } from './user/userSlice'

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
            dispatch(addUser(data))
            return data
        }
        return rejectWithValue(data)
    }
)
//create logout async

//create refresh async

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
        }

    }, 
    extraReducers: ( builder ) =>{
        builder
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

    }
})

export const { login, logout } = sessionSlice.actions
export default sessionSlice.reducer