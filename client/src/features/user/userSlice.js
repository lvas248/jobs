import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signupUser = createAsyncThunk(
    'singup/user',
    async(obj, { rejectWithValue })=>{
        const response = await fetch('/signup',{
            method:'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(obj)
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

export default userSlice.reducer;