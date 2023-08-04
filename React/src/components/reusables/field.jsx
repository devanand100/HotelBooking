

import {  Field, ErrorMessage } from 'formik';

// type2 means number or text
export default  function Input ({ Name, type,  errors, touched, label,sx, type2 = null})  {
    return( 
            <Field
                fullWidth
                sx={{...sx,overflow:'visible',mb:2,}}
                as={type}
                variant="outlined"
                label={label}
                name={Name}
                type={type2}
                error={errors[Name] && touched[Name]}
                helperText={<ErrorMessage name={Name}  />}
              />
              ) 
}
