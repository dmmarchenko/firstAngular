import { Injectable } from '@angular/core';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Logout } from './store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {

  private tokenExpirationTimer: any;

  constructor(private store: Store<AppState>) {
  }

  public setLogoutTimer(expirationDuration: number) {
    console.log(`Auto logout after ${expirationDuration / 1000} seconds`);
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new Logout());
    }, expirationDuration);
  }

  public clearLogoutTime() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}

