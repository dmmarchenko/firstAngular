import { Actions, Effect, ofType } from '@ngrx/effects';
import * as AuthActions from './auth.actions';
import { AuthenticateSuccess } from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { User } from '../user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignUpStart) => {
      return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp' +
        `?key=${environment.firebaseAPIKey}`,
        {
          email: signupAction.payload.email,
          password: signupAction.payload.password,
          returnSecureToken: true
        }).pipe(
        tap(responseData => {
          this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
        }),
        map(this.handleAuthentication),
        catchError(AuthEffects.handleError)
      );
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword' +
        `?key=${environment.firebaseAPIKey}`,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        })
        .pipe(
          tap(responseData => {
            this.authService.setLogoutTimer(+responseData.expiresIn * 1000);
          }),
          map(this.handleAuthentication),
          catchError(AuthEffects.handleError)
        );
    })
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((action: AuthActions.AuthenticateSuccess) => {
      if (action.redirect) {
        console.log(`Redirecting to /`);
        this.router.navigate(['/']);
      }
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTime();
      localStorage.removeItem('userData');
      this.router.navigate(['/']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        tokenInternal: string;
        tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return {type: 'NOOP_ACTION'};
      }

      const loadedUser = new User(userData.email, userData.id, userData.tokenInternal, new Date(userData.tokenExpirationDate));

      if (loadedUser.token) {
        const expirationDuration = new Date(userData.tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authService.setLogoutTimer(expirationDuration);
        return new AuthenticateSuccess(loadedUser, false);
      }
      return {type: 'NOOP_ACTION'};
    })
  );

  constructor(private actions$: Actions, private httpClient: HttpClient, private router: Router, private authService: AuthService) {
  }

  private static handleError(errorResponse) {
    const errorMessage = AuthEffects.parseErrorMessage(errorResponse);
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }

  private handleAuthentication(responseData) {
    const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
    const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.AuthenticateSuccess(user, true);
  }

  private static parseErrorMessage(errorResponse) {
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
    return errorMessage;
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
