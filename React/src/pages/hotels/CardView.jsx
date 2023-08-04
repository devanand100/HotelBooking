import HoteCard from './hoteCard'

export default function CardView({hotels}) {
    console.log(hotels)
  return (
        <div className='result'>
            {hotels.map((hotel)=>(
                <HoteCard hotel={hotel} key={hotel.id}/>
            ))}
        </div>  

    )}
