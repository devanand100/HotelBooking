import { DataGrid } from '@mui/x-data-grid';
import instance from '../../redux/axiosInstance';
import { useState ,useEffect} from 'react';

export default function AllBookingsAdmin() {

    
  const [rows, setRows] = useState([]);
  
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await instance.get("booking/allBookings");

        const data = res.data.map((b,index) => {
          return {

            id: index +1,
            name: b.Hotel.name,
            city: b.Hotel.city,
            fullName: b.User.fullName,
            email: b.User.email,
            checkIn: new Date( b.checkIn).toISOString().slice(0, 10),
            checkOut: new Date ( b.checkOut).toISOString().slice(0, 10)
          }
        });
        setRows(data);

      } catch (error) {
        console.log(error);
      }
    }
   
    fetchBookings();
  }, []);



    
const columns = [
    { field: 'name', headerName: 'Hotel Name', width: 230 },
    { field: 'city', headerName: 'Hotel City', width: 100 },
    { field: 'fullName', headerName: 'guest name', width: 130 },
    { field: 'email', headerName: 'guest email', width: 200 },
    { field: 'checkIn', headerName: 'checkIn', width: 130 },
    { field: 'checkOut', headerName: 'checkOut', width: 130 },

  ];
  
  
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
         paginationModel={{ page: 0, pageSize: rows.length }}
        
      />
    </div>
  )
}


