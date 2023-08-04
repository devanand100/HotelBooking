export interface dstyle  {
    offsetLeft:string;offsetWidth:string
}
export interface User {
    id: number,
    fullName:string,
    firstName:string,
    lastName:string, 
    email:string,
    image:string,
    isAdmin:boolean
}

export interface Booking {
    u_id: number;
    h_id: number;
    checkIn: Date; 
    checkOut: Date; 
    rooms:number;
    total: number;
    Hotel: hotel;
    User?:User
  }
  
export  interface Amenities {
    id: number;
    h_id: number;
    wifi: boolean;
    concierge: boolean;
    parking: boolean;
    dumbbell: boolean;
    spa: boolean;
    pool: boolean;
    createdAt: string;
    updatedAt: string;
  }

export interface hotel
 {
     id: number,
    name:string ,
    city: string,
    address:string,
    category: number,
    image?: string,
    price:number,
    createdAt:Date,
    updatedAt: Date
    Amenities: Amenities,
    destroyTime:Date
}