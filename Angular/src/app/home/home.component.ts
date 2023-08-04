import { Component, OnInit } from '@angular/core';
// import { UserdataService } from '../services/userdata.service';
import { FormBuilder} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from '../services/hotel.service';
import {  hotel } from '../model/models';
import { StorageService } from '../services/storage.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit {
 user = this._usersStorage.user.value;
  clicked= false;
  hotels:hotel[] = [];
  categories:any;
  sort = "sort by price";

  constructor(private fb:FormBuilder,private toast:ToastrService,private _hotel:HotelService,private _usersStorage:StorageService){}
  ngOnInit(): void {
    
    this._hotel.categories().subscribe((data)=>{
      this.categories = data;
    })
    }
 
  get city(){
    return this.search.get("city");
  }
  get category(){
    return this.search.get("category");
  }
  filterIt(){
    if(this.sort === "low to high"){
      this.hotels.sort((a,b)=>{
        return a.price - b.price
      })
    }
    if(this.sort === "high to low"){
      this.hotels.sort((a,b)=>{
        return b.price - a.price
      })
    }
  }
  search = this.fb.group({
    city : [""],
    category:[0],  
  });

  onSubmit(){ 
    this.clicked = true
    this._hotel.filter(this.search.value).subscribe((data:any)=>{
      if(data){
      this.hotels = data
    }else{
      this.hotels = []
    }
    })
  }

  cities(e:any){
    this.search.patchValue({city:e})
      this.onSubmit()
  }
}
