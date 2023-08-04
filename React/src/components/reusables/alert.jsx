// import { useState,forwardRef } from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import * as React from 'react';
import Stack from '@mui/material/Stack';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert  sx={{position:'absolute', top:'0px' ,left:'0px'}}  elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
  export default function CustomizedSnackbars({open,setOpen,type,message}) {
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
    return (
      <Stack spacing={2} sx={{ width: '100%'}}> 
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={type} >
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }