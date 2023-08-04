import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookNowComponent } from './book-now/book-now.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { AuthGuardGuard } from '../_helpers/auth-guard.guard';

const routes: Routes = [
  {path:"bookNow/:h_id",component:BookNowComponent,canActivate: [AuthGuardGuard],data: { roles: ["user"] }},
  {path:"bookings",component:MybookingsComponent,canActivate: [AuthGuardGuard],data: { roles: ["user"] }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class BookingRoutingModule { }
