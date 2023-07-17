import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../sessionSlice";

export const signupUser = createAsyncThunk(
    'signup/user',
    async(obj, { dispatch, rejectWithValue })=>{
        const response = await fetch('/signup',{
            method:'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await response.json()

        if(response.ok){
            dispatch(login())
            return data
        }
        return rejectWithValue(data)
    }
)


const initialState = {
    entity: {},
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        removeUser: ( state )=>{
            state.entity = initialState
            state.error = null
            state.status = 'idle'
        },
        addUser: ( state, action )=>{
            state.entity = action.payload
            state.error = null
            state.status = 'idle'
        }

    },
    extraReducers: ( builder ) => {
        builder        
            .addCase(signupUser.pending, state =>{
                state.status = 'pending'
                state.error = null
                state.entity = {}
            })
            .addCase( signupUser.rejected, (state, action) =>{
                state.status = 'idle'
                state.error = action.payload
                state.entity = {}
            })
            .addCase( signupUser.fulfilled, (state, action) =>{
                state.status = 'idle'
                state.error = null
                state.entity = action.payload
            })
    }

})

export const { removeUser, addUser } = userSlice.actions
export default userSlice.reducer;