import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { useState } from 'react';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { Button } from '@mui/material';
import instance from '../../redux/axiosInstance';
import {  ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from '../../components/reusables/toast'
  import "react-toastify/dist/ReactToastify.css";
import { logout } from '../../redux/user/userSlice';
import userlogout from '../auth/logout';
import CustomizedDialogs from './dialog';

export default function BookNowForm({ price, hotelId, userId }) {
    const [open,setOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const today = dayjs();
    const tomorrow = dayjs().add(1, 'day');
    const [room, setrooms] = useState(1)
    const [dates, setDates] = useState([today, tomorrow]);
    // eslint-disable-next-line no-unused-vars
    let days = 1;
    let total = days ? (days * price * room) : (price * room);


    
function confirmBooking(value ) {
    console.warn(userId)
    instance.post(`booking/addBooking/${userId}`, value)
        .then(() => {toast ("booking confirmed " ,"success")
            setOpen(true)
    }).catch((error) => {

                if(error.statusCode === 401){
                    navigate('/login')
                    toast ("session Expired Login Again" ,"error")
                    dispatch(logout())
                    userlogout()
                    return
                }
                
            toast (error.message ,"error")
        })
}
    if (dates[0] && dates[1]) {
        const timeDiff = Math.abs(new Date(dates[0].$d).getTime() - new Date(dates[1].$d).getTime());
        days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    return (<>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DemoItem label="Checkin-CheckOut" component="DateRangePicker">
                    <DateRangePicker defaultValue={[today, tomorrow]} disablePast onChange={(e) => setDates(e)} />
                </DemoItem>
            </DemoContainer>
        </LocalizationProvider>
        <div className="center_div">
            <h3>Select rooms</h3>
            <div className="btndiv">
                <i onClick={() => (setrooms(room + 1))} className="fa-solid fa-plus"></i>{room}<i onClick={() => (room > 1 ? setrooms(room - 1) : null)} className="fa-solid fa-minus"></i>
            </div>
        </div>
        <div className='totalPrice'>
            <h3>Total Price:</h3> <i className="fa-solid fa-indian-rupee-sign"></i>
            {total}</div>
        <Button variant='contained'
            onClick={() => confirmBooking({
                h_id: hotelId,
                checkIn: dates[0].$d,
                checkOut: dates[1].$d,
                rooms: room,
                total: total
            })} >Confirm Booking</Button>
           <ToastContainer />
           <CustomizedDialogs open={open} setOpen={setOpen} rooms={room} total={total} checkIn={dates[0] ? dates[0].$d : null}  checkOut={dates[1] ? dates[1].$d : null} />
    </>
    )
}

