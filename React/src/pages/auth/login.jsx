import * as Yup from 'yup';
import { Formik, Form} from 'formik';
import { TextField } from '@mui/material';
import Input from '../../components/reusables/field';
import Btn from '../../components/reusables/button';
import Passwords from '../../components/reusables/passwords';
import Box from '@mui/material/Box';
import { useDispatch,useSelector} from 'react-redux';
import {loginUser} from '../../redux/user/userSlice'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from '../../components/reusables/toast'
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';

export default function Login() {
    // const [message,setMessage] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {user,isLoading,error} = useSelector((store)=> store.user)

    

    useEffect(()=>{

      if(error){
        toast(error,"error")
        navigate('/login')
      }
      console.log(typeof Object.keys(user).length )
      if(Object.keys(user).length > 0){
        toast("log in success","success")
        navigate('/')
      }
    },[user,isLoading,error])
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required'),
      });

    
  return (
    (
      < Box
        sx={{
          width: "100%",
          display:'flex',
          justifyContent:"center"
        }}>


        < Box
        sx={{
          width: 350,
          height: 400,
          border: 1,
          borderRadius: 1 ,
          pl:4,
          pr:4,
          pb:3,
          borderColor: '#b5bdb7'
        }}>
               <h1>Login</h1>
          <Formik
            initialValues={{ email: '', password: ''  }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              dispatch(loginUser(values))
              console.log(user,isLoading,error);
             
            }}
          >
            {({ errors, touched }) => (
              <Form>
             
                <div>
                <Input Name={'email'} type={TextField} errors={errors} touched={touched} label={'email'}  sx={{width:'100%'}} />
                </div>
    
               <div>
               <Passwords name={'password'} errors={errors} touched={touched}  sx={{width:'100%'}}/>
               </div>
               
                  <Btn  variant= 'contained' sx={{}} name = {'submit'}  type = {'submit'} />
              </Form>
            )}
          </Formik>
          <div className='registerHere' ><Link  to={"/register"}>create Account</Link> </div>

        </Box>
        <ToastContainer />

     </Box>

      )
    )
}
