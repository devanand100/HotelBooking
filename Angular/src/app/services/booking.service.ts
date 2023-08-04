import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../model/models';
import { StorageService } from './storage.service';
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class BookingService  {
  u_id: any ;
  url = "http://localhost:4000/booking/"
  constructor(private http:HttpClient,private _userStore:StorageService) { }
  idInit(): void {
    console.log("Hiiii")
   this.u_id = this._userStore.user.value.id
  }

  booking(data:any){
    this.idInit()
    return this.http.post(`${this.url}addBooking/${this.u_id}`,data)
  }

  mybooking(){
  this.idInit()
    return this.http.get<any>(`${this.url}allBookings/${this.u_id}`)
  }

  allBookings():Observable< Booking>{
    return this.http.get<any>(`${this.url}allBookings`)

  }
}
