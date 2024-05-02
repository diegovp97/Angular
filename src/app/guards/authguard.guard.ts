import { CanActivateFn } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth';


export const authguardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const authService = inject(AuthService);  
  const router = inject(Router);  

  return authService.user.pipe(  
    take(1),
    map(user => {
      console.log('Estado de autenticación:', user);
      if (user) {
        return true;
      } else {
        router.navigate(['/gate']);  
        return false;
      }
    })
  );
};
