import {searchHotels} from '../../redux/hotels/hotelSlice'
import { Formik, Form} from 'formik';
import { useDispatch} from 'react-redux';
import { TextField } from '@mui/material';
import Input from '../../components/reusables/field'
import Btn from '../../components/reusables/button';
import SelectBox from '../../components/reusables/SelectBox';

export default function SearchForm({ setClicked,searchVal,setSearchVal}) {
  

    const dispatch = useDispatch()
    return (
      <Formik
          initialValues={{ city: searchVal.city, category: searchVal.category  }}
  
          onSubmit={(values) => {
            setSearchVal(draft=>{
              draft.city = values.city;
              draft.category = values.category
            })
           setClicked(true)
             dispatch(searchHotels(values))
          }}
        >
          {({  errors, touched }) => (
            <Form>
              <div>
                 <Input Name={'city'} type={TextField} errors={errors} touched={touched} label={'search'}  sx={{width:'100%'}} />
              </div>
  
              <div>
                 <SelectBox name={"category"} errors={errors} touched={touched} label={"Select Category"}/>
              </div>
             
                <Btn  variant= 'contained' sx={{}} name = {'Search'}  type = {'submit'} />
            </Form>
          )}
        </Formik>
    )
  }