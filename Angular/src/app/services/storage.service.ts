import { User } from './../model/models';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

const USER = 'user'
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private router: Router, private toast: ToastrService, private http: HttpClient) { }

  user = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem(USER) || "{}") );
  isAdmin = new BehaviorSubject<boolean>(this.user.value.isAdmin || false);
  isLogged = new BehaviorSubject<boolean>(this.user.value.id >0 || false);
  bookingHotel = new BehaviorSubject<string>("")

  setUser(value: User) {

    sessionStorage.removeItem(USER)
    console.log("value passed setuser start", value)
     this.http.get<string>(`http://localhost:4000/user/image?id=${value.image}`).subscribe(data =>{
      value.image = data
      sessionStorage.setItem(USER, JSON.stringify(value))
    })


    if (value.isAdmin) {
      this.isAdmin.next(true);
    }
    this.isLogged.next(true)
     this.user.next(value)
    this.autoLogOut()

  }

  

  logOut() {
    sessionStorage.removeItem(USER)
    this.isLogged.next(false)
    this.user.next({} as User)
    this.isAdmin.next(false)
    this.http.get("http://localhost:4000/user/logOut").subscribe(() => console.log("logOut Successfull"))
    this.router.navigate(['/login'])
    this.bookingHotel.next("");
  }

  

  asObser() {
    return this.isLogged.asObservable()
  }

  checkisAdmin() {
    return this.isAdmin.asObservable()
  }

  autoLogOut() {
    setTimeout(() => {
      this.logOut()
      this.toast.error("Your Session Expired , Login Again To Continue");
    }, 540000);
  }
}

