import * as Yup from 'yup';
import { Formik, Form} from 'formik';
import { TextField } from '@mui/material';
import Input from '../../components/reusables/field';
import Btn from '../../components/reusables/button';
import FileUpload from '../../components/reusables/fileUpload';
import Passwords from '../../components/reusables/passwords';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import {registerUser} from '../../redux/user/userSlice'
import { useNavigate } from 'react-router-dom';

export default function Registration() {
    // const [message,setMessage] = useState("")
  const dispatch = useDispatch();
    const navigate = useNavigate()
    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required('Required'),
    });
  
  return(
    < Box
    sx={{
      width: "100%",
      display:'flex',
      justifyContent:"center"
    }}>
    < Box
    sx={{
      width:500,
      height: 550,
      border: 1,
      borderRadius: 1 ,
      pl:4,
      pr:4,
      pb:3,
      borderColor: '#b5bdb7'
    }}>
      <h1>  Create  Account</h1>
      <Formik
        initialValues={{ firstName: '', lastName: '', email: '', password: '' , image : "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
         const formdata = new FormData();

         for(let key in values){
            formdata.append(key,values[key])
         }
        
         dispatch(registerUser(formdata))
         navigate('/login')
        
        }}
      >
        {({ setFieldValue,errors, touched }) => (
          <Form>
           
            <div>
            <Input Name={'firstName'} type={TextField} errors={errors} touched={touched} label={'firstName'}  sx={{width:'100%'}} />
            </div>

            <div>
            <Input Name={'lastName'} type={TextField} errors={errors} touched={touched} label={'lastName'}  sx={{width:'100%'}} />
            </div>

            <div>
            <Input Name={'email'} type={TextField} errors={errors} touched={touched} label={'email'}  sx={{width:'100%'}} />
            </div>

            <div>
              <FileUpload setFieldValue={setFieldValue} />
            </div>
           
           <div>
           <Passwords name={'password'} errors={errors} touched={touched}  sx={{width:'100%'}}/>
           </div>
           
              <Btn  variant= 'contained' sx={{}} name = {'submit'}  type = {'submit'} />
            
          </Form>
        )}
      </Formik>

    </Box>
    </Box>

  );
}  