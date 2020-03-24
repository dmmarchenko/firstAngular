import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Login, Logout } from './store/auth.actions';

@Injectable({providedIn: 'root'})
export class AuthService {

  private tokenExpirationTimer: any;

  constructor(private httpClient: HttpClient, private router: Router, private store: Store<AppState>) {
  }

  private static handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    let errorMessage = 'An unknown error occured!';
    if (errorResponse.error && errorResponse.error.error) {
      switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists already';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'The password is invalid or the user does not have a password.';
          break;
        case 'USER_DISABLED':
          errorMessage = 'The user account has been disabled by an administrator.';
          break;
        case 'OPERATION_NOT_ALLOWED':
          errorMessage = 'Password sign-in is disabled for this project.';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
          break;
      }
    }
    return throwError(errorMessage);
  }

  signup(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp' +
      `?key=${environment.firebaseAPIKey}`,
      {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(AuthService.handleError),
        tap(response => this.handleLogin(response))
      );
  }

  logout() {
    this.store.dispatch(new Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log(`Auto logout after ${expirationDuration / 1000} seconds`);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      tokenInternal: string;
      tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData.tokenInternal, new Date(userData.tokenExpirationDate));

    if (loadedUser.token) {
      this.store.dispatch(new Login(loadedUser));
      const expirationDuration =
        new Date(userData.tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  private handleLogin(responseData: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
    let user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
    this.store.dispatch(new Login(user));
    this.autoLogout(+responseData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
