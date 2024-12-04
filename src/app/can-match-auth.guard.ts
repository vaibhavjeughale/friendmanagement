import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CanMatchAuthGuard implements CanActivate {
  
  canActivate(
  
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isloggedIn = localStorage.getItem('isloggedIn')
      if(isloggedIn=='false'){
        alert("not authenticated user");
        return false;
      }
    return true;
  }
  
}
