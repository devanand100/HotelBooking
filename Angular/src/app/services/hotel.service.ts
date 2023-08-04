import { data } from 'jquery';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { hotel } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  editFlag = new BehaviorSubject<boolean> (false);

  editHotel!:hotel 
  url = "http://localhost:4000/hotel/"
  constructor(private http:HttpClient) { }

  filter(value:any){
    return this.http.get(`${this.url}filter?city=${value.city}&category=${value.category}`)
  }
  
  categories(){
    return this.http.get(`${this.url}categories`)
  }

  addHotel(data:any){
    return this.http.post(`${this.url}addHotel`,data)
  }

  getHotel(id:any):any{
     return this.http.get(`${this.url}${id}`)
  }

  allHotels$:Observable<hotel[]> = this.http.get<any>(`${this.url}hotels`).pipe(
    tap((data)=>{
      console.log(data)
      console.log("all hotel called")
    })
  )

  setEditHotel(data:hotel):void{
    this.editHotel = data;
  }

  setEdit(){
    this.editFlag.next(true)
  }

  getEditHotel():hotel{
     delete this.editHotel.image
     
    //  this.editHotel.
    return this.editHotel
  }
  // http://localhost:4000/hotel/updateHotel/2
  updateHotel(data:any){
    return this.http.patch(`${this.url}updateHotel/${this.editHotel.id}`,data)
  }
 
  uploadImage(data:any,id:any){
    return this.http.post(`${this.url}upload/${id}`,data)

  }
}
