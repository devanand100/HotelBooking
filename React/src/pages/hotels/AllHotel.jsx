
import { useState } from 'react';
import { useSelector ,useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { getAllHotels } from '../../redux/hotels/hotelSlice'
import Loader from '../../components/reusables/loader';
import CardView from './CardView';
import Adminpage from './Adminpage';

export default function AllHotel() {
    const dispatch = useDispatch();

    const {hotel,user}= useSelector((store)=>store)

    const [isAdmin,setisAdmin] = useState(false)

    useEffect(()=>{
        dispatch(getAllHotels())
        setisAdmin(user.user.isAdmin)
    },[dispatch, user.user.isAdmin])
    
    // Loading
        if(hotel.isLoading)
            return <Loader/>

    // Hotel Cards
    return (<>
        {!isAdmin ? <CardView hotels={hotel.hotels}/> : <Adminpage hotels={hotel.hotels} />} 
        </>
    )}