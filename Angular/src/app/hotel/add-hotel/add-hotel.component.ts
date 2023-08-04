import { hotel } from '../../model/models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from '../../services/hotel.service';
import { Router } from '@angular/router';
import {selectValidator} from "../../shared/select.validator"
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})

export class AddHotelComponent implements OnInit{
  constructor(private fb:FormBuilder,private toast:ToastrService,private _hotel:HotelService,private router: Router,private _userStore:StorageService){}
  ngOnInit(): void {
      this._hotel.editFlag.subscribe((data)=>{
        this.editFlag = data
      })
      if(this.editFlag){
       this.editingHotel =  this._hotel.getEditHotel()
      }
      
      this.editHotel()
  }
  editFlag:boolean= false
  editingHotel:hotel | undefined;
  image:any;
  getImage(event:any){
    if(event.target.files.length > 0){
      this.image = event.target.files[0];
    }
  }
  get name():any{
    return this.addHotel.get('name');
  }
  get city():any{
    return this.addHotel.get('city');
  }
  get address():any{
    return this.addHotel.get("address");
  }
  get category():any{
    return this.addHotel.get("category");
  }
  get price():any{
    return this.addHotel.get("price");
  }

  // get amenities():any{
  //   return this.addHotel.get("amenities");
  // }
  addHotel:any = this.fb.group({
    name: ["",[Validators.required,Validators.maxLength(25)]],
    city: ["",[Validators.required,Validators.maxLength(25)]],
    image:[""],
    address:["",[Validators.required,Validators.maxLength(200)]],
    category: [0,[Validators.required,selectValidator]],
    price:["",[Validators.required,Validators.min(1)]],
    Amenities: this.fb.group({
             wifi : [false],
             concierge : [false],
             parking : [false],
             dumbbell :[false] ,
             spa : [false],
             pool : [false]
    })
  })

  //  Editing hotel
  editHotel(){
    if(this.editFlag){
      console.log("editing")
      console.log(this.editingHotel)
      this.addHotel.patchValue(this.editingHotel);
    }
  }
  onSubmit(){
    let values = this.addHotel.value

    if(!this.editFlag){
    const formData = new FormData();
    console.log(values)
    for ( var key in values) {
      if(key === "image"){
        continue;
      }
      if(key === "Amenities"){
        let amenities = JSON.stringify(values[key])
        formData.append(key, amenities);
        continue;
      }
      formData.append(key, values[key]);
     }
     formData.append("image",this.image)

    this._hotel.addHotel(formData).subscribe({
      next:(data:any) =>{
        this.toast.success(`Hotel successfully added`)
        this.addHotel.reset();
      },
      error:error => {
        if (error.error) {
          if (error.status === 401) {
            this.router.navigate(['/login'])
            this.toast.error("session expired login again", `${error.error.message}`)
            this._userStore.logOut()
          }else{
            this.toast.error(`${error.error.message}`)
          }
        }
      }
    }

    )}
    else{
      delete this.addHotel.value.image
      if(this.image){
      const formData = new FormData();
      formData.append("image",this.image)
      this._hotel.uploadImage(formData,this.editingHotel?.id).subscribe((data)=>{
      })
    }
      this._hotel.updateHotel(this.addHotel.value).subscribe({
        next:(data:any) =>{
          this.toast.success(`Hotel successfully updated`)
          this.addHotel.reset();
          this._hotel.editFlag.next(false)
        },
        error:error => { if (error.error) {
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
