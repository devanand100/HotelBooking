import { Router } from '@angular/router';
import { Booking } from './../../model/models';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from 'src/app/services/booking.service';
import { HotelService } from 'src/app/services/hotel.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.css']
})
export class MybookingsComponent implements OnInit {
  dtOptions: any = {};
  constructor(private _booking: BookingService, private toast: ToastrService, private router: Router, private _userStore: StorageService) { }
  bookings: Booking[] = [];
  isAdmin: boolean | undefined;

  ngOnInit(): void {
    this.dtOptions = {
      // pagingType: 'full_numbers',
      responsive: true
    };

    this._userStore.checkisAdmin().subscribe((data) => {
      this.isAdmin = data;
    });

    if (this.isAdmin) {
      this._booking.allBookings().subscribe({
        next: (data: any) => {
          this.bookings = data;
        },
        error: error => {
          if (error.error) {
            if (error.status === 401) {
              this.router.navigate(['/login'])
              this.toast.error("session expired login again", `${error.error.message}`)
              this._userStore.logOut()
            } else {
              this.toast.error(`${error.error.message}`)
            }
          }
        }
      })
    }else{
      this._booking.mybooking().subscribe({
        next: (data: any) => {
          this.bookings = data;
        },
        error: error => {
          if (error.error) {
            if (error.status === 401) {
              this.router.navigate(['/login'])
              this.toast.error("session expired login again", `${error.error.message}`)
              this._userStore.logOut()
            } else {
              this.toast.error(`${error.error.message}`)
            }
          }
        }
      })
    }
  }
}
