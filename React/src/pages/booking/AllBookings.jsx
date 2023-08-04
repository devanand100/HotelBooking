
// import { useNavigate } from 'react-router-dom';
import UserBookings from "./userPage";
import AllBookingsAdmin from "./AdminPage";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";

export default function AllBookings() {

    // const navigate = useNavigate();
    const [isAdmin,setisAdmin] = useState(false);
    let { user } = useSelector((state) => state.user)
  
    // const dispatch = useDispatch()

    useEffect(()=>{
      setisAdmin(user.isAdmin)
    },[isAdmin, user.isAdmin])

    return (
      <>
      {isAdmin ? <AllBookingsAdmin /> : <UserBookings id={user.id} />}
      </>
    )


}