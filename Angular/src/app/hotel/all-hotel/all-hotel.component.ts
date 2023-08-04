import { Observable, Subject, async } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { hotel } from 'src/app/model/models';
import { StorageService } from 'src/app/services/storage.service';
import { HttpClient } from '@angular/common/http';
import { data } from 'jquery';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-hotel',
  templateUrl: './all-hotel.component.html',
  styleUrls: ['./all-hotel.component.css']
})
export class AllHotelComponent implements OnInit,  OnInit {
  dtOptions: DataTables.Settings = {};
  user = this._userStore.user.value;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private _hotel:HotelService,private http:HttpClient,private toast:ToastrService,private router: Router,private _userStore:StorageService){}
  @ViewChild(DataTableDirective, {static: false})
  dtElement!: DataTableDirective;
  
  allHotel!:hotel[]
   
  ngOnInit(): void {
     this.fetchHotels()
     this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }

  fetchHotels():void{
   this._hotel.allHotels$.subscribe((data)=>{
    this.allHotel = data;
   })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fetchHotels();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchHotels();
  }
 
  delete(id:any){
    if( confirm("Sure you want to delete")){

    this.http.delete(`http://localhost:4000/hotel/deleteHotel/${id}`).subscribe({
      next:(data:any) =>{
        this.toast.success(" successfully deleted")
        this.allHotel = this.allHotel.filter((element)=> element.id !== id )
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
    })
  }
  }
  

  edit(id:number){
    const ehotel = this.allHotel.filter((element)=> element.id === id )[0]
    this._hotel.setEditHotel(ehotel);
    this._hotel.setEdit()
    this.router.navigate(['/hotel/addHotel'])

  }
}
