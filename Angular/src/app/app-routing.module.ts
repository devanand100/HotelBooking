import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardGuard } from './_helpers/auth-guard.guard';



const routes: Routes = [
  {path:"",redirectTo:'home',pathMatch:'full'},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"home",component:HomeComponent},
  {path:"hotel", loadChildren: () => import('./hotel/hotel.module').then(m => m.HotelModule)},
  {path:"booking", loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule)}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
