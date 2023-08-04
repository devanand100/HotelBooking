
import { useState,useEffect } from 'react';

import { useDispatch,useSelector} from 'react-redux';
import {searchHotels} from '../../redux/hotels/hotelSlice'
import Loader from '../../components/reusables/loader';
import CardView from '../hotels/CardView';
import SearchForm from './SearchForm';
import { useImmer } from "use-immer";

export default function Home() {

  const {hotels, isLoading, error}= useSelector((store)=>store.hotel)
  const dispatch = useDispatch();
  const [clicked ,setClicked] = useState(false);
  const [searchVal , setSearchVal] = useImmer ({city:"",category:''})


  useEffect(()=>{
    dispatch(searchHotels(''))
  },[])

  // Loader
  if(isLoading)
    return <Loader/>

// Search Form

return (<>
    <div className="searchForm">
      <h3 className='title'> Search Hotel </h3>
  <SearchForm setClicked={setClicked} searchVal={searchVal} setSearchVal={setSearchVal} />
  </div>
  { hotels.length > 0  ? < CardView hotels={hotels}/> : (clicked && <h3>Search result 0</h3>)  }
  </>
)}
  
 
