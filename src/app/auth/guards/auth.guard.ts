import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


  const  checkAuthStatus = (): boolean | Observable<boolean> => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.checkAutentication()
      .pipe(
        tap((isAuthenticated) => {
          if(!isAuthenticated)
            router.navigate(['./auth/login']);
        })
      );
  };

  export const authCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    return checkAuthStatus();
  }
  export const authCanActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>  {
    return checkAuthStatus();
  }




