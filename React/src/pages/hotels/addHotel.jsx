import {Formik,Form} from 'formik'
import * as Yup from 'yup';
import Input from '../../components/reusables/field';
import Btn from '../../components/reusables/button';
import FileUpload from '../../components/reusables/fileUpload';
// import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import SelectBox from '../../components/reusables/SelectBox';
import CheckBox from '../../components/reusables/checkBox';
import instance from '../../redux/axiosInstance';
import { ToastContainer } from 'react-toastify';
import notify from '../../components/reusables/toast';
import { useState } from 'react';
import Loader from '../../components/reusables/loader';

export default function AddHotel({editHotel}) {

    const [loader,setloader] = useState(false)
    const validationSchema = Yup.object().shape({
        name:Yup.string().required("required"),
        city:Yup.string().required("required"),
        address:Yup.string().required("required"),
        category:Yup.number().required("required"),
        price:Yup.number().required("required"),

    })
  return (
<div className='addHotelForm'>
    <h3>New Hotel</h3>
        <Formik
        initialValues = {!editHotel ? {name:"",city:"",address:"",category:"",price:"",image:"",Amenities:{
            wifi: true,
            concierge: false,
            parking: false,
            dumbbell: false,
            spa: false,
            pool: false,
        }} : editHotel}
        validationSchema = {validationSchema}
        onSubmit = {(values)=>{
            setloader(true)
            const formdata = new FormData();

            for(let key in values){
                console.log(key,values[key])
                if(key === "updatedAt"){
                    formdata.append(key,new Date())
                    continue;
                }
                if(key === "Amenities"){
                    formdata.append(key,JSON.stringify(values[key]))
                    continue;
                }
               formdata.append(key,values[key])
            }
            if(!editHotel){
            instance.post("hotel/addHotel",formdata)
            .then(()=>notify("successfully Added","success") ,  setloader(false)

            )
            .catch((error)=> notify(error.message,"error") ,  setloader(false)
            )
         }  else {
            
            instance.patch(`hotel/updateHotel/${editHotel.id}`,formdata).
            then(()=> notify("successfully Added","success"),  setloader(false))
            .catch((error)=> notify(error.message,"error") ,  setloader(false)
            )
         } 
            console.log(values)
           

        }}
        >
                  {({ setFieldValue,errors, touched }) => (
                    <Form>
                        <div>
                            <Input  Name={'name'} type={TextField} errors={errors} touched={touched} label={'Hotel Name'}  sx={{width:'100%'}}/>
                        </div>

                        <div>
                            <Input  Name={'city'} type={TextField} errors={errors} touched={touched} label={'city'}  sx={{width:'100%'}}/>
                        </div>

                        <div>
                            <Input  Name={'address'} type={TextField} errors={errors} touched={touched} label={'address'}  sx={{width:'100%'}}/>
                        </div>

                        <div>
                            <SelectBox  name={"category"} errors={errors} touched={touched} label={"Select Category"}/>
                        </div>

                        <div>
                            <Input  Name={'price'} type={TextField} errors={errors} touched={touched} label={'price'} type2={"number"}  sx={{width:'100%'}}/>
                        </div>

                        <div>
                            <FileUpload setFieldValue= {setFieldValue} />
                        </div>

                        <div className='AddAmenities'>
                            <div className='checkboxes' >Amenities</div>
                            
                                <CheckBox label={"wifi"} name={"wifi"} />
                                <CheckBox label={"dinner"} name={"concierge"} />
                                <CheckBox label={"parking"} name={"parking"} />
                                <CheckBox label={"gym"} name={"dumbbell"} />
                                <CheckBox label={"spa"} name={"spa"} />
                                <CheckBox label={"pool"} name={"pool"} />
                        </div>

                        <Btn  variant= 'contained' sx={{}} name = {'submit'}  type = {'submit'} />

                    <ToastContainer/>
                    </Form>
                  )}
        </Formik>
              {loader ? <Loader/> :null}
        </div>
    )
}
