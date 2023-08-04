import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private _userStore: StorageService, private router: Router, private toast: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { roles } = route.data
    

    return this._userStore.user.pipe(
      map((user) => {
        if (Object.keys(user).length === 0) {
          if (roles && roles.includes("user")) {
            this.toast.info("you have login first")
            this._userStore.bookingHotel.next( state.url);
          }
          this.router.navigate(['/login'])
          console.warn("authguard navigate loging")

          return false;
        }
        if (user) {
          if (roles && roles.includes("Admin") && user.isAdmin) {
            return true;
          }

          if (roles && roles.includes("Admin") && !user.isAdmin) {
            this.router.navigate(['/home'])
            console.warn("authguard navigate home")
            return false;
          }
          return true;
        }
        console.warn("authguard navigate loging")
        this.router.navigate(['/login'])
        return false;
      })
    )

  }

}
