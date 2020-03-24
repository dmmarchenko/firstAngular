import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { ClearError, LoginStart, SignUpStart } from './store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private storeSub: Subscription;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.storeSub = this.store.select('auth')
      .subscribe(authState => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
      });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(new LoginStart({email, password}));
    } else {
      this.store.dispatch(new SignUpStart({email, password}));
    }
    form.reset();
  }

  onErrorHandled() {
    this.store.dispatch(new ClearError());
  }
}
