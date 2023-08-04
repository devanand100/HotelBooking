
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState ,useEffect} from 'react';
import { useSelector } from 'react-redux';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocationCityOutlinedIcon from '@mui/icons-material/LocationCityOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
// import {HomeOutlinedIcon,LocationCityOutlinedIcon,AddCircleOutlineOutlinedIcon,ListAltOutlinedIcon,EventAvailableOutlinedIcon} from '@mui/icons-material';
// import { useTheme } from '@mui/material/styles';
import {Link } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import { useDispatch } from 'react-redux';
import userlogout from '../../pages/auth/logout'; 
import {logout} from '../../redux/user/userSlice'
import instance from '../../redux/axiosInstance';
import Loader from './loader';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

function ResponsiveDrawer() {
  const navigate = useNavigate();
  const {user ,isLoading,error} = useSelector(state => state.user)
  const dispatch = useDispatch();

  const [currentRole,setcurrentRole] = useState(null)
  let images;

  instance.get(`http://localhost:4000/user/image?id=${user.image}`).then((res)=> images = res.data).catch(er=>console.log(er))
  
//   const navItems = [
//     {

//         icon: <HomeOutlinedIcon sx={{fontSize:30}}/>,
//         label:"Home",
//         url:'/',
//         roles:["user","admin"]

//     },
//     {
//         icon:<AddCircleOutlineOutlinedIcon sx={{fontSize:30}}/>,
//         label:"New Hotel",
//         url:'/newHotel',
//         roles:["Admin"]
       
//     },
//     {
//         icon:<ListAltOutlinedIcon sx={{fontSize:30}}/>,
//         label:"All Hotel",
//         url:'/allHotels',
//         roles:["user","admin"]
//     },
//     {
//         icon:<EventAvailableOutlinedIcon sx={{fontSize:30}}/>,
//         label:"Bookings",
//         url:'/bookings',
//         roles:["user","admin"]
       
//     }
// ]


  useEffect(()=>{
    if(user)
    setcurrentRole  (user.isAdmin ? "admin" : "user") ;
     
  },[user])

  function handleClick(){
    dispatch(logout())
    userlogout();
    setcurrentRole(null)
    navigate('/login')
    
  }
  
    // const theme = useTheme();


  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {

    // if(isMobile)
    console.log(images)
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar sx={{backgroundColor:'primary.light'}} > 
      
      </Toolbar>
      {/* <Divider /> */}
      <List >
        
        
         
          <ListItem  key={1} disablePadding >
           
            <Link to= '/' >
            <ListItemButton  onClick={handleDrawerToggle}  >
              <ListItemIcon sx={{color: 'primary.main', fontSize:160}}>
              <HomeOutlinedIcon sx={{fontSize:30}}/>
              </ListItemIcon>
              <ListItemText primary= "Home" />
            </ListItemButton>
            </Link>
          
          </ListItem>

          
          <ListItem  key={2} disablePadding >
            { currentRole === "admin" &&
            <Link to= '/newHotel' >
            <ListItemButton  onClick={handleDrawerToggle}  >
              <ListItemIcon sx={{color: 'primary.main', fontSize:160}}>
                <AddCircleOutlineOutlinedIcon sx={{fontSize:30}}/>
              </ListItemIcon>
              <ListItemText primary= "New Hotel" />
            </ListItemButton>
            </Link>
          }
          </ListItem>
          
          <ListItem  key={3} disablePadding >
            
            <Link to='/allHotels' >
            <ListItemButton  onClick={handleDrawerToggle}  >
              <ListItemIcon sx={{color: 'primary.main', fontSize:160}}>
                <ListAltOutlinedIcon sx={{fontSize:30}}/>
              </ListItemIcon>
              <ListItemText primary= "All Hotel" />
            </ListItemButton>
            </Link>
          
          </ListItem>

          <ListItem  key={4} disablePadding >
            {  Object.keys(user).length > 0 &&
            <Link to= '/bookings' >
            <ListItemButton  onClick={handleDrawerToggle}  >
              <ListItemIcon sx={{color: 'primary.main', fontSize:160}}>
              <EventAvailableOutlinedIcon sx={{fontSize:30}}/>
              </ListItemIcon>
              <ListItemText primary= "Bookings" />
            </ListItemButton>
            </Link>
          }
          </ListItem>
        
      </List>
     
    </div>
  );

  
  if(isLoading)
  return <Loader/>



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
         width:"100%",
          backgroundColor:'primary.light',
          zIndex: 9999 
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2,  }}
          >
           <MenuIcon/>

          </IconButton>
          <LocationCityOutlinedIcon sx={{mr:"10px"}}/>

          <Typography variant="h6" noWrap component="div" sx={{ mr: 2, color:"primary.contrastText" }}>

           Hotel
          </Typography>
          <Box sx={{ display:'flex', alignItems:'center', width: 46, height: 46 ,position:"absolute",right:"60px"}}>
          {  Object.keys(user).length > 0 ? (<> <Avatar
                alt="Remy Sharp"
                src={images}
                
              //  sx={{ width: 46, height: 46 ,position:"absolute",right:"30px"}}
            /><p className='logout' onClick ={handleClick}>LogOut</p> </> ) : <Link className='login' to={'/login'}>Login</Link>}
         </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'none' ,md:"block",lg:"block",xl:"block"},
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "70px" },
          }}
          open
        >
          <div>
      <Toolbar sx={{backgroundColor:'primary.light'}} > 
      
      </Toolbar>
      
      {/* <List >
        {navItems.map((item,index) => (
         <Link to= {item.url} key={index}>
          <ListItem  disablePadding >
          <Tooltip sx={{ p: 10 }} title={item.label} placement="right" arrow>
  
            <ListItemButton    sx={{display:"flex",flexDirection:{sm:"column"},alignItem:"center",pl:"40px",mb:"5px"}}>
              <ListItemIcon sx={{color: 'primary.main'}}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton> 
            </Tooltip>
          </ListItem>
          </Link>
        ))}
      </List> */}

      
      <List sx={{overflowX:"hidden"}} >
        
        
         
          <ListItem  key={1} disablePadding >
           
            <Link to= '/' >
            <Tooltip sx={{ p: 10 ,}} title="Home" placement="right" arrow>

            <ListItemButton   sx={{display:"flex",flexDirection:{sm:"column"},alignItem:"center",mb:"5px"}} >
              <ListItemIcon sx={{color: 'primary.main', fontSize:160}} >
              <HomeOutlinedIcon sx={{fontSize:30}}/>
              </ListItemIcon>
              {/* <ListItemText primary= "Home" /> */}
            </ListItemButton>
            </Tooltip>

            </Link>
          
          </ListItem>

          
          <ListItem  key={2} disablePadding >
            { currentRole === "admin" &&
            <Link to= '/newHotel' >
       <Tooltip sx={{ p: 10 }} title="New Hotel" placement="right" arrow>
            <ListItemButton   sx={{display:"flex",flexDirection:{sm:"column"},alignItem:"center",mb:"5px"}}  >
              <ListItemIcon sx={{color: 'primary.main', fontSize:160}}>
                <AddCircleOutlineOutlinedIcon sx={{fontSize:30}}/>
              </ListItemIcon>
              {/* <ListItemText primary= "New Hotel" /> */}
            </ListItemButton>
            </Tooltip>

            </Link>
          }
          </ListItem>
          
          <ListItem  key={3} disablePadding >
            
            <Link to='/allHotels' >
            <Tooltip sx={{ p: 10 }} title="All Hotel" placement="right" arrow>
            <ListItemButton   sx={{display:"flex",flexDirection:{sm:"column"},alignItem:"center",mb:"5px"}} >
              <ListItemIcon sx={{color: 'primary.main', fontSize:160}}>
                <ListAltOutlinedIcon sx={{fontSize:30}}/>
              </ListItemIcon>
              {/* <ListItemText primary= "All Hotel" /> */}
            </ListItemButton>
            </Tooltip>

            </Link>
          
          </ListItem>

          <ListItem  key={4} disablePadding >
            {  Object.keys(user).length > 0 &&
            <Link to= '/bookings' >
      <Tooltip sx={{ p: 10 }} title="Bookings" placement="right" arrow>
            <ListItemButton   sx={{display:"flex",flexDirection:{sm:"column"},alignItem:"center",mb:"5px"}}  >
              <ListItemIcon sx={{color: 'primary.main', fontSize:160}}>
                <EventAvailableOutlinedIcon sx={{fontSize:30}}/>
              </ListItemIcon>
              {/* <ListItemText primary= "New Hotel" /> */}
            </ListItemButton>
            </Tooltip>

            </Link>
          }
          </ListItem>
        
      </List>
     
    </div>
        </Drawer>
      </Box>
      
    </Box>
  );

}


export default ResponsiveDrawer;