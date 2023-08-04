import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { UserdataService } from 'src/app/services/userdata.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private _dataService: UserdataService,
    private _storageService: StorageService,
    private toast: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
    this._storageService.bookingHotel.subscribe((data) => {
      console.log("from login", data)
      this.bookingHotel = data;
    })
  }

  bookingHotel: string | undefined;

  get email() {
    return this.login.get("email");
  }
  get password() {
    return this.login.get("password");
  }
  login = this.fb.group({
    password: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  });

  onSubmit() {
    this._dataService.logInUser(this.login.value).subscribe({
      next: (data: any) => {

        this._storageService.setUser(data)
        this.toast.success("login successfull", `Hello ${data.firstName}`)
        console.log("from loginSubmit")
        console.log(this.bookingHotel)
        if (this.bookingHotel && this.bookingHotel?.length > 2) {
          console.log(this.bookingHotel)
          console.log("booking hotel true")
          this.router.navigate([this.bookingHotel])
        } else {
          this.router.navigate(['/home'])
          console.warn("loginComponent navigate Home")
        }
      },
      error: error => {
        this.toast.error(`${error.error.message}`)
      }
    })

  }
}
