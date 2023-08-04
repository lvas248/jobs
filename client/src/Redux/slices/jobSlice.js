import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getJobs = createAsyncThunk(
    'fetch/jobs',
    async( _, { rejectWithValue })=>{
        const response = await fetch('https://data.cityofnewyork.us/resource/kpav-sd4t.json?posting_type=External&$order=posting_date%20DESC',{
            method: 'GET',
            headers:{
                "X-App-Token": process.env.REACT_APP_JOBS_ACCESS_TOKEN
            }
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

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers:{},
    extraReducers:(builder)=>[
        builder
            .addCase( getJobs.pending, state =>{
                state.status = 'pending'
                state.error = null
            })
            .addCase( getJobs.rejected, (state,action) =>{
                state.status = 'idle'
                state.error = action.payload
            })
            .addCase( getJobs.fulfilled, (state,action)=>{
                state.status = 'idle'
                state.error = null
                state.entity = action.payload
            })
    ]
})

export default jobSlice.reducer;