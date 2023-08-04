import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../axiosInstance'

let profile = window.sessionStorage.getItem('user');
const initialState = {
    isLoading: false,
    user: profile ? JSON.parse(profile):{},
    error: ''
}

export const loginUser = createAsyncThunk('user/loginUser', (data) => {

    return instance.post('user/login', data)
        .then((response) => {
            return response.data
        })
       
})

export const registerUser = createAsyncThunk('user/registerUser', (data) => {

    return instance.post('user/register', data)
        .then((response) => {
            return response.data
        })
       
})

const createUser = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout:(state)=>{
            state.user = {}
        }
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled]: (state) => {
            state.isLoading = false
        },
        [registerUser.rejected]: (state, action) => {
            state.isLoading = false
            state.error =  action.error.message;
        },
        [loginUser.pending]: (state) => {
            state.error =''
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state,action) => {
            state.isLoading = false;
            window.sessionStorage.removeItem("user")
            window.sessionStorage.setItem("user",JSON.stringify( action.payload))
            state.user = action.payload;
            state.error =''
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false
            state.error =  action.error.message;
        }
    }
})

export const{logout} = createUser.actions
export default createUser.reducer;