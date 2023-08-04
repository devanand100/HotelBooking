import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { hotel } from 'src/app/model/models';
import { BookingService } from 'src/app/services/booking.service';
import { HotelService } from 'src/app/services/hotel.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.css']
})
export class BookNowComponent implements OnInit {
  h_id: any;
  hotel!: hotel;
  rooms: number = 1;
  days: number = 1;
  total!: number;
  minDate = new Date()
  constructor(private fb: FormBuilder, private toast: ToastrService, private route: ActivatedRoute, private _booking: BookingService, private router: Router, private _hotel: HotelService, private _userStore: StorageService) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe((param: ParamMap) => {
      this.h_id = param.get('h_id');
    })
    this._hotel.getHotel(this.h_id).subscribe((data: hotel) => {
      this.hotel = data;
      this.total = this.hotel?.price * this.rooms * this.days;
    })
  }
  bookNow = this.fb.group({

    checkIn: ["", Validators.required],
    checkOut: ["", Validators.required],
  })



  onSubmit() {
    let checkIn: any = this.bookNow.value.checkIn;
    let checkOut: any = this.bookNow.value.checkOut;


    this._booking.booking({ h_id: this.h_id, checkIn: checkIn, checkOut: checkOut, rooms: this.rooms, total: this.total }).subscribe({

      next: (data: any) => {
        this.toast.success("booking successfull")
        this._userStore.bookingHotel.next("")
        this.router.navigate(['/booking/bookings'])
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

  plus() {
    this.rooms++;
    this.setToatal();
  }

  minus() {
    if (this.rooms > 1)
      this.rooms--;
    this.setToatal();
  }

  totalDays() {
    console.log(this.days)
    console.log(this.rooms)
    console.log(this.hotel.price)
    const checkInDate = this.bookNow.value.checkIn;
    const checkOutDate = this.bookNow.value.checkOut;

    if (checkInDate && checkOutDate) {
      const timeDiff = Math.abs(new Date(checkOutDate).getTime() - new Date(checkInDate).getTime());
      this.days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    }
    this.setToatal();
  }

  setToatal() {
    this.total = this.hotel?.price * this.rooms * this.days
  }
}
