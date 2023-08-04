import {  Field, ErrorMessage } from 'formik';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';


export default function SelectBox({name,errors,touched,label}) {
    
return( <FormControl fullWidth sx={{mb:5}} >
    <InputLabel>{name}</InputLabel>
    <Field
      as={Select}
      name={name}
      label={label}
      error={errors[name] && touched[name]}
    >
    <MenuItem  value={3} >3  Star</MenuItem >
     <MenuItem  value={4}>4  Star</MenuItem >
     <MenuItem  value={5}>5  Star</MenuItem >
    </Field>
    <FormHelperText sx={{color:'#d32f2f'}} ><ErrorMessage name={name}  /></FormHelperText>

  </FormControl>)


}
