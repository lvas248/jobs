import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../sessionSlice";

export const submitToken = createAsyncThunk(
    'verifiyEmail/user',
    async( obj, { dispatch, rejectWithValue})=>{
        const response = await fetch('/verify_email',{
            method:'POST',
            headers: {
                'Content-type':'application/json'
            },        
            body: JSON.stringify(obj)
        })

        const data = await response.json()

        if(response.ok){
            dispatch(login())
            return data}
        return rejectWithValue(data)
    }
)

export const requestVerifyEmail = createAsyncThunk(
    'requestVerifyEmail/user',
    async( obj,{ rejectWithValue})=>{
        const response = await fetch('/request_email_verify',{
            method:'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(obj)
        })
        const data = await response.json()

        if(response.ok) return 
        return rejectWithValue(data)
    }
)

export const requestPasswordReset = createAsyncThunk(
    'requestReset/user',
    async(obj, { rejectWithValue })=>{
        const response = await fetch('/password_reset_request',{
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(obj)
        })

        const data = await response.json()

        if(response.ok) return data
        return rejectWithValue(data)
    }
)

export const submitPasswordUpdate = createAsyncThunk(
   ' submitPasswordReset/user',
   async( obj, { rejectWithValue })=>{
    const response = await fetch(`/reset_password/${obj.token}`,{
        method: 'PATCH',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(obj.passwordObj)
    })
    const data = await response.json()
    if(response.ok) return data
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
    extraReducers: ( builder ) =>{
        builder
            .addCase( submitToken.pending, state =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( submitToken.rejected, (state, action) =>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( submitToken.fulfilled, (state, action) =>{
                state.status = 'idle'
                state.error = null
                state.entity = action.payload
            })
            .addCase( requestVerifyEmail.pending, state =>{
                state.status='pending'
                state.error = null
            })
            .addCase( requestVerifyEmail.rejected, (state, action) =>{
                state.status='idle'
                state.error = action.payload
            })
            .addCase( requestVerifyEmail.fulfilled, state =>{
                state.status='idle'
                state.error = null
            })
            .addCase( requestPasswordReset.pending, state =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( requestPasswordReset.rejected, (state, action)=>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( requestPasswordReset.fulfilled, ( state )=>{
                state.status = 'idle'
                state.error = null
            })
            .addCase( submitPasswordUpdate.pending, state =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( submitPasswordUpdate.rejected, (state,action) =>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( submitPasswordUpdate.fulfilled, state =>{
                state.status = 'idle'
                state.error = null
            })

    }
})

export const { removeUser, addUser } = userSlice.actions
export default userSlice.reducer;