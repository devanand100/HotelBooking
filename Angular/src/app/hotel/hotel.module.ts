import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";

import { HotelRoutingModule } from './hotel-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AllHotelComponent } from './all-hotel/all-hotel.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
     AddHotelComponent,
    AllHotelComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    DataTablesModule
  ]
})
export class HotelModule { }
