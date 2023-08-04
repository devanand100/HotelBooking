import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { deleteHotel } from '../../redux/hotels/hotelSlice';
import instance from '../../redux/axiosInstance';
import notify from '../../components/reusables/toast';
import { useSelector } from 'react-redux';
import {  ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';


export default function Adminpage() {


    const {hotels} = useSelector((store)=> store.hotel)
      
const columns = [
    { field: 'image', headerName: 'image', width: 230 ,height:500,  renderCell: (params) => <img src={params.value} /> ,headerClassName : "hotelstable" },
    { field: 'city', headerName: 'Hotel City', width: 100 ,headerClassName : "hotelstable" },
    { field: 'name', headerName: 'Hotel name', width: 170 ,headerClassName : "hotelstable" },
    { field: 'price', headerName: 'price', width: 80 ,headerClassName : "hotelstable" },
    { field: 'address', headerName: 'address',  flex: 1,minWidth: 250 ,headerClassName : "hotelstable" },
    { field:"edit", headerName: 'Edit', width: 30 ,  renderCell: (data) => <Edit id={data.id} /> ,headerClassName : "hotelstable" },
    { field:"delete", headerName: 'Delete', width: 80 ,  renderCell: (data) => <Delete id={data.id} /> ,headerClassName : "hotelstable" },



  ];
  return (
    <Box sx={{ height: 500, width: '100%','& .hotelstable':{
        backgroundColor:"primary.light",color:"primary.contrastText"
    } }}>
      <DataGrid
        rows={hotels}
        columns={columns}
        rowHeight={150}
        paginationModel={{ page: 0, pageSize: hotels.length }}
      />
      <ToastContainer/>
    </Box>
  )
}

export function Edit({id}){
    const navigate = useNavigate();

    return (
        <IconButton onClick={()=> navigate(`/editHotel/${id}`)}>
        < EditIcon/>
     </IconButton>
    )
}
export function Delete({id}){
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const handledelete = ()=> {
        instance.delete(`hotel/deleteHotel/${id}`).then(()=> {
            notify("successfully deleted","success")
            dispatch(deleteHotel(id))
        }).catch((error)=>{
            notify(error.message,"error")

        })
    }
    return (
        <IconButton  onClick={handledelete}>
           < DeleteIcon />
        </IconButton>
    )
}