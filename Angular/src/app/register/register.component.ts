import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserdataService } from 'src/app/services/userdata.service';
import { passwordValidator } from 'src/app/shared/password.validator';
import { ValidateUsername } from 'src/app/shared/username.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  profile:any;
  constructor(private fb:FormBuilder,private _dataService:UserdataService,private toast:ToastrService,private router:Router){
  }
  // all users
  getImage(event:any){
    if(event.target.files.length > 0){
      this.profile = event.target.files[0];
    }
  }
  usersData$ = this._dataService.users$
  
  get firstName(){
    return this.registration.get('firstName');
  }
  get lastName(){
    return this.registration.get('lastName');
  }
  get Password(){
    return this.registration.get("confirmPassword");
  }
  get email(){
    return this.registration.get("email");
  }
  get password(){
    return this.registration.get("password");
  }
  registration = this.fb.group({
    firstName : ["",[Validators.required,ValidateUsername,Validators.maxLength(50)]],
    lastName : ["",[Validators.required,Validators.maxLength(50)]],
    email:["",[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    image:[null,],
    password: ['',[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")]],
    confirmPassword:['',[Validators.required]],
  },{validator:passwordValidator});

  onSubmit(){ 
    let values = this.registration.value
    const formData:any = new FormData();

    for ( var key in values) {

      if(key === "image"){
        continue;
      }
      formData.append(key, values[key]);
  }

  console.log(this.profile)
    formData.append("image",this.profile)

    for (const value of formData.values()) {
      console.log(value);
    }

    this._dataService.registerUser(formData).subscribe({
      next:data =>{
        this.toast.success("registration successful")
         this.router.navigate(['/login'])
      },
      error:error =>{
        this.toast.error(`${error.error.message}`)
      }
    })
  }
}


