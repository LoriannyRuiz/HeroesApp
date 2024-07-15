import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, RouterStateSnapshot, UrlSegment, Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';


  const  checkAuthStatus = (): boolean | Observable<boolean> => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.checkAutentication()
      .pipe(
        tap((isAuthenticated) => {
          if(isAuthenticated)
            router.navigate(['./']);
        }),
        map(isAuthenticated => !isAuthenticated)
      )
  };

  export const publicCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    return checkAuthStatus();
  }
  export const publicCanActivate: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>  {
    return checkAuthStatus();
  }

