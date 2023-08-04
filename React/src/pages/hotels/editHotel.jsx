import {  useParams } from 'react-router-dom';
import instance from '../../redux/axiosInstance';
import { useState ,useEffect} from 'react';
import AddHotel from './addHotel';

export default function EditHotel() {
    let { id } = useParams();

    const [editHotel, setEditHotel] = useState(null);

    useEffect(()=>{

        async  function  fetchHotels (){
            try{
                const res =    await instance.get(`hotel/${id}`)
                setEditHotel(res.data)
                console.log(editHotel)
            }catch(error){
                console.log(error)
            }   
     } 
        fetchHotels()

    },[id])
   

  return (<>
        { editHotel ? <AddHotel editHotel= {editHotel} /> : null }
  </>)
}
