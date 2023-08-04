// import { useState } from 'react'
import './App.css'
import Registration from './pages/auth/registration'
import Box from '@mui/material/Box';
import { createTheme,ThemeProvider } from "@mui/material";
import { useState ,useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Login from './pages/auth/login';
import ResponsiveDrawer from './components/reusables/header'
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from './pages/home/home';
import AllHotel from './pages/hotels/AllHotel';
import BookNow from './pages/booking/bookNow';
import AllBookings from './pages/booking/AllBookings';
import AddHotel from './pages/hotels/addHotel';
import EditHotel from './pages/hotels/editHotel';
import UserRoutes from './pages/auth/UserRoutes';
import AdminRotes from './pages/auth/AdminRoutes';
import { useSelector } from 'react-redux';
function App() {
  const [mode, setMode] = useState("light");
  const {user} = useSelector((store)=>store.user)
  const  [islogged,setislogged] = useState(false);
  const  [isAdmin,setisAdmin] =useState(false)

const theme = createTheme({
  palette:{
    mode:mode,
    primary:{
      main: "#1976d2",
      light: "#42a5f5",
      dark:"#1565c0",
      contrastText: "#FFF",
      white:"#fff",
    }
  }  
})

useEffect(()=>{ 
  setislogged (sessionStorage.getItem('user') ? true :false)
  setisAdmin (sessionStorage.getItem('user') ?   JSON.parse ( sessionStorage.getItem('user')).isAdmin :false)
},[user])

  return ( 

    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ResponsiveDrawer />
        
      <Box
        component="main"
        sx={{ position: 'relative',flexGrow: 1, p: 3, width: { sm: `calc(100% - ${240}px)` } ,ml:{sm:"60px"},mt:"66px" ,display:"flex" , justifyContent:"center" ,flexDirection:'column'}}
      >        
      <Routes>
        <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/allHotels" element={<AllHotel />} />
        {/* <Route path="/bookNow/:id" element={<BookNow />} />
        <Route path="/bookings" element={<AllBookings />} /> */}
        {/* <Route path="/newHotel" element={<AddHotel />} />
        <Route path="/editHotel/:id" element={<EditHotel />} /> */}

        <Route element={<UserRoutes islogged={islogged}/>}>
          <Route path="/bookNow/:id" element={<BookNow />} />
          <Route path="/bookings" element={<AllBookings />} />
        </Route>


        <Route element={<AdminRotes islogged={islogged} isAdmin = {isAdmin} />}>
           <Route path="/newHotel" element={<AddHotel />} />
           <Route path="/editHotel/:id" element={<EditHotel />} />
        </Route>
      </Routes>
    
      </Box>
      </ThemeProvider>
      
    </Router>
  
  )
}

export default App
