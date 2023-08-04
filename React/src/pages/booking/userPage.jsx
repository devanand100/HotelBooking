import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import instance from "../../redux/axiosInstance"
import { useEffect, useState } from "react"
import {  useDispatch } from 'react-redux';
import toast from '../../components/reusables/toast'
import { ToastContainer } from 'react-toastify';
import userlogout from "../auth/logout";

import { logout } from "../../redux/user/userSlice";
import { useNavigate } from 'react-router-dom';

export default function UserBookings({id}) {
  
    const navigate = useNavigate();
    const [bookings,setbookings] = useState([]);

    const dispatch = useDispatch()


    useEffect( () => {

        async function fetchBookings() {
                await instance.get(`booking/allBookings/${id}`)
                .then((res)=> setbookings(res.data))
                .catch((error)=>{
                  toast(error.message, "error");
                  console.log(error.statusCode);
                  dispatch(logout());
                  userlogout()
                  navigate('/login')
                })
            
        }
        fetchBookings();
    }, [dispatch, id, navigate]);

    return (<>
            <BasicTable bookings={bookings}/>
            <ToastContainer/>
        </> )
}


export  function BasicTable({bookings}) {
    console.log(bookings)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead sx={{backgroundColor:"primary.light" }}>
          <TableRow >
            <TableCell sx={{color:"primary.contrastText"}} >Name</TableCell>
            <TableCell sx={{color:"primary.contrastText"}} align="right">City</TableCell>
            <TableCell  sx={{color:"primary.contrastText",width:"200px"}} align="right" >Address</TableCell>
            <TableCell sx={{color:"primary.contrastText"}} align="right">Availibility</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow
              key={booking.Hotel.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {booking.Hotel.name}
              </TableCell>
              <TableCell align="right">{booking.Hotel.city}</TableCell>
              <TableCell align="right">{booking.Hotel.address}</TableCell>
              <TableCell align="right">{!booking.destroyTime ? "available" : "Not Available"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
