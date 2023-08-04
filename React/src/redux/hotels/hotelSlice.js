import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../axiosInstance'


const initialState = {
    isLoading: false,
    hotels: [],
    error: ''
}

export const getAllHotels = createAsyncThunk('hotel/allHotels',  () => {

    const res =  instance.get('hotel/hotels')
    .then((response) =>  response.data )

    return res
       
})

export const searchHotels = createAsyncThunk('hotel/searchHotel',  (value) => {

    const res =  instance.get(`hotel/filter?city=${value.city}&category=${value.category}` )
    .then((response) =>  response.data )

    return res
       
})

const hotelSlice = createSlice({
    name: 'hotel',
    initialState,
    reducers: {
            deleteHotel:(state,action)=>{
                console.log(action.payload)
                state.hotels =  state.hotels.filter((item)=>item.id !== Number(action.payload))
            }
    },
    extraReducers: {
        [getAllHotels.pending]: (state) => {
            state.isLoading = true
        },
        [getAllHotels.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.hotels = action.payload
        
        },
        [getAllHotels.rejected]: (state, action) => {
            state.isLoading = false
            state.error =  action.error.message;
        },
        [searchHotels.pending]: (state) => {
            state.isLoading = true
        },
        [searchHotels.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.hotels = action.payload
        
        },
        [searchHotels.rejected]: (state, action) => {
            state.isLoading = false
            state.error =  action.error.message;
        }
    }
})

export const {deleteHotel} = hotelSlice.actions
export default hotelSlice.reducer