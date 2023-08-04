import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from '../services/data.service';
import { StorageService } from '../services/storage.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/models';
import { data } from 'jquery';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  constructor(private http:HttpClient,private _dataService:DataService,private _userStore:StorageService,private toast:ToastrService){}

  mediaQuery  = window.matchMedia('(max-width: 900px)');
  isLogedIn:boolean | undefined ;
  isAdmin:boolean | undefined  ;  
  user:User | undefined ;
  // userImag:any 
  boxState = false;
  show = false;


  ngOnInit(): void {

    document.body.addEventListener('click', (event:any) => {   
      if ( event.target?.id !== "usrimg"  &&  event.target.id !== "bar"  ) {
        this.boxState = false;
        this.show = false;
      }
      if(event.target?.id == "usrimg"){
        this.show = false;
      }
      if(event.target?.id == "bar"){
        this.boxState = false;
      }
      
    });

      this.user = this._userStore.user.value

      this._userStore.asObser().subscribe((data)=>{
          this.isLogedIn = data;
      });

      // this._userStore.image().subscribe((data)=>{
      //   this.userImag = data;
      // })
      this._userStore.checkisAdmin().subscribe((data)=>{
        this.isAdmin = data;
      });
      this._userStore.user.subscribe(data =>{ 
        console.log("user assigned")
        this.user = data
        console.log(data)
      })  

    this._dataService.getObj().subscribe((data)=>{
      this.style.left = data.offsetLeft+"px";
      this.style.width = data.offsetWidth+"px";
    })
  }


  style:{left:string,width:string}= {left:"",width:""}  ;
  showlink(e:any){
    if(this.mediaQuery.matches){
    if(e.target.id !== 'nav' && e.target.id !== 'head' && e.target.id !== 'usrimg' )
    this.show = !this.show
    }
  }
  logOut(){
    if(confirm("sure you want to logOut")){
      this._userStore.logOut()
    }
  }
  
  showBox(){
    this.boxState = !this.boxState
  }
}
