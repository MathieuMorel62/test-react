import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { logout } from '../auth/authSlice';

const API_BASE_URL = "http://localhost:5173"
const ENDPOINTS ={
   courses: `${API_BASE_URL}/courses.json`
}
const initialState = {
    courses: []
}
export const fetchCourses = createAsyncThunk("courses/fetchCourses", async () =>{
    const res = await axios.get(ENDPOINTS.courses)
    return res.data.courses
})

const coursesSlice = createSlice({
    name: 'courses',
    initialState: initialState,
    extraReducers : (builder) => {
        builder.addCase(fetchCourses.fulfilled, (state, action) =>{
            state.courses = action.payload


        },
        builder.addCase(logout, (state) =>{
            state.courses = []
        }))
    }
})

export default coursesSlice.reducer