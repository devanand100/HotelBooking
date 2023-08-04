import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { AllHotelComponent } from './all-hotel/all-hotel.component';
import { AuthGuardGuard } from '../_helpers/auth-guard.guard';
const routes: Routes = [
  {path:"addHotel",component:AddHotelComponent, canActivate: [AuthGuardGuard],data: { roles: ["Admin"] }},
  {path:"allHotel",component:AllHotelComponent,}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }
