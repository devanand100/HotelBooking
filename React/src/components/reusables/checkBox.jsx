
import {  Field,  } from 'formik';
    


export default function CheckBox({label,name}) {
  return (<>
    <Field  type="checkbox" name={`Amenities.${name}` }   />
    <label>{label}</label>

    </> )
   
}
