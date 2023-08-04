import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  Url = "http://localhost:4000/user/"
  constructor(private http:HttpClient) { }
  
   users$= this.http.get<any>(`${this.Url}${'users'}`).pipe(
    tap((data)=>{
      console.log(data);
    })
  )
    
  registerUser(data:any){
    console.log(data)
    return this.http.post(`${this.Url}${'register'}`,data)
  }

  logInUser(data:any){
    return this.http.post(`${this.Url}${'login'}`,data)
  }
  
}
