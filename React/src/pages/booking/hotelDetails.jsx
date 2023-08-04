
import { Amenities } from "../hotels/hoteCard"
import './hotelDetails.css'
export default function HotelDetails({hotel}) {
    return (<>
        <div className="left">
        <h4>Review Your Booking Hotel</h4>
        <div   className="hotelCard">
                  <img  className="img-fluid" src={hotel.image} />
                  <div className="details">
                      <div className="title">
                          <h4>{hotel.name}</h4>
                      </div>
                      <div className="location"><i className="fa-solid fa-location-dot"></i>{hotel.city}</div>
                      <h4>Price Per Day:<i className="fa-solid fa-indian-rupee-sign"></i>{hotel.price}</h4>
                  </div>
              </div>
              <div  className="address box">
                <h4>Full Address</h4>
                {hotel.address}
              </div>
              
        <div  className="facelitie box">
          <h4 className="service">Amenities</h4>
          <Amenities Amenities={hotel.Amenities} />
        </div>
        
        </div>
        </> )
}
