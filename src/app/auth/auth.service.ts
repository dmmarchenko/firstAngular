import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private httpClient: HttpClient) {
  }

  signup(email: string, password: string) {
    return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDR02JkR5XEpTnemzBRV0Oggf76PQ4SmLA',
      {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(
        catchError(errorResponse => {
          console.log(errorResponse);
          let errorMessage = 'An unknown error occured!';
          if (errorResponse.error && errorResponse.error.error) {
            switch (errorResponse.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
            }
          }
          return throwError(errorMessage);
        })
      );
  }
}

interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}
