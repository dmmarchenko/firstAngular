import { Actions, Effect, ofType } from '@ngrx/effects';
import { LOGIN, Login, LOGIN_START, LoginFail, LoginStart } from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthResponseData } from '../auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { User } from '../user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(LOGIN_START),
    switchMap((authData: LoginStart) => {
      return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword' +
        `?key=${environment.firebaseAPIKey}`,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        })
        .pipe(
          map(responseData => {
            const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
            const user = new User(responseData.email, responseData.localId, responseData.idToken, expirationDate);
            return new Login(user);
          }),
          catchError(errorResponse => {
            const errorMessage = AuthEffects.parseErrorMessage(errorResponse);
            return of(new LoginFail(errorMessage));
          })
        );
    })
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(LOGIN),
    tap(() => this.router.navigate(['/']))
  );

  constructor(private actions$: Actions, private httpClient: HttpClient, private router: Router) {
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
