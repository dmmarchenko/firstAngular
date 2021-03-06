import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store<AppState>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select('auth')
      .pipe(
        take(1),
        map(state => state.user),
        map(user => {
          const isAuth = !!user;
          if (isAuth) {
            return true;
          }
          return this.router.createUrlTree(['/auth']);
        })
      );
  }

}
