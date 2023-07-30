import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const saveJob = createAsyncThunk(
    'save/job',
    async( obj, { rejectWithValue })=>{

        const response = await fetch('/saved_jobs',{
            method: 'POST',
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

export const deleteSavedJob = createAsyncThunk(
    'delete/job',
    async( obj, { rejectWithValue })=>{
        const response = await fetch(`/saved_jobs/${obj}`,{
            method: 'DELETE'
        })
        const data = await response

        if(response.ok) return obj
        return rejectWithValue(data)
    }
)

export const updateSavedJob = createAsyncThunk(
    'udpate/job',
    async( obj, { rejectWithValue })=>{
        const response = await fetch(`/saved_jobs/${obj}`,{
            method: 'PATCH'
        })

        const data = await response.json()

        if(response.ok) return data
        return rejectWithValue(data)
    }
)

const initialState = {
    entity: [],
    status: 'idle',
    error: null
}

const savedJobSlice = createSlice({
    name: 'savedJobs',
    initialState,
    reducers: {
        loadSavedJobs: (state, action )=>{
            state.entity = action.payload
        },
        removeSavedJobs: ( state ) =>{
            state.entity = []
        }
    },
    extraReducers: ( builder ) => {
        builder
            .addCase( saveJob.pending, state =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( saveJob.rejected, ( state, action ) =>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( saveJob.fulfilled, ( state, action ) =>{
                state.status = 'idle'
                state.error = null
                state.entity = [action.payload, ...state.entity]
            })
            .addCase( deleteSavedJob.pending, state =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( deleteSavedJob.rejected, (state,action) =>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( deleteSavedJob.fulfilled, (state, action) =>{
                state.status = 'idle'
                state.error = null
                state.entity = state.entity.filter( j => j.id !== action.payload)
            })
            .addCase( updateSavedJob.pending, state =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( updateSavedJob.rejected, ( state, action ) =>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( updateSavedJob.fulfilled, ( state, action ) =>{
                state.status = 'idle'
                state.error = null
                state.entity = state.entity.map( j =>{
                    if(j.id === action.payload.id) return action.payload
                    else return j
                })
            })
            

    }
})



export default savedJobSlice.reducer
export const { loadSavedJobs, removeSavedJobs } = savedJobSlice.actions
