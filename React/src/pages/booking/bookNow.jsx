import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState ,useEffect } from 'react';
import BookNowForm from './bookNowForm';
import { useSelector } from 'react-redux';
import {  useParams } from 'react-router-dom';
import HotelDetails from './hotelDetails';

 function LabTabs() {
  const [value, setValue] = useState('1');
  let { id } = useParams();
  const {user,hotel} =  useSelector((store)=>store)
  
 let userId = user.user.id

  useEffect(()=>{
  },[])

    const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Confirm booking" value="1" />
            <Tab label="Hotel Details" value="2" />
            <Tab label="Item Three" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1"><BookNowForm price={300} hotelId = {id} userId = {userId} /></TabPanel>
        <TabPanel value="2"><HotelDetails hotel={hotel.hotels.find((hotel)=> hotel.id === Number(id))} /></TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}

export default function BookNow() {
  return (
    <LabTabs/>
  )
}
