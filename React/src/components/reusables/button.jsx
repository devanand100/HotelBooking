import { Button } from '@mui/material';
import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const Btn = forwardRef(({variant,sx,name ,type = null,onClick},ref)=>{
    return(
    <Button onClick={onClick} type={type} variant={variant} sx={sx} ref={ref} >{name}</Button>)   
})

export default Btn;