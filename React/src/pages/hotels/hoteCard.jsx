import { useNavigate } from 'react-router-dom';
import Btn from '../../components/reusables/button';
import './hotelCard.css'
import Tooltip from '@mui/material/Tooltip';


export default function HoteCard({ hotel }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="hotelCard">
        <img className="img-fluid" src={hotel.image} />
        <div className="details">
          <div className="title">
            <h4>{hotel.name}</h4>
            <h4><i className="fa-solid fa-indian-rupee-sign"></i>{hotel.price}</h4>
          </div>
          <div className="location"><i className="fa-solid fa-location-dot"></i>{hotel.city}</div>
          Amenities
          <div className="facelities">
            <Amenities Amenities={hotel.Amenities} />
            <Btn variant='contained' sx={{}} name={'Book Now'} type={'button'} onClick={() => navigate(`/bookNow/${hotel.id}`)} />
          </div>
        </div>
      </div>
    </>
  )
}

   export function Amenities({ Amenities }) {
    
     return (
     <>
       <div className="icons">
         { Amenities.wifi && <Tooltip title="wifi" placement="bottom-end">
         <i className="fa-solid fa-wifi"></i>
          </Tooltip>  }
         {Amenities.concierge && <Tooltip title="dinner" placement="bottom-end">
         <i className="fa-solid fa-bell-concierge"></i>
          </Tooltip> }
         {Amenities.parking && <Tooltip title="parking" placement="bottom-end">
         <i className="fa-solid fa-square-parking"></i>
          </Tooltip> }
         {Amenities.dumbbell && <Tooltip title="gym" placement="bottom-end">
         <i className="fa-solid fa-dumbbell"></i>
          </Tooltip> }
         {Amenities.spa && <Tooltip title="spa" placement="bottom-end">
         <i className="fa-solid fa-spa"></i>
          </Tooltip> }
         {Amenities.pool && <Tooltip title="swimming pool" placement="bottom-end">
         <i className="fa-solid fa-person-swimming"></i>
          </Tooltip> }
       </div>
     </>
     )}