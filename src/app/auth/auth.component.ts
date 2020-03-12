import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      console.log('Currently in login mode, do nothing');
    } else {
      this.isLoading = true;
      form.reset();

      this.authService.signup(email, password)
        .subscribe(() => {
          this.isLoading = false;
        }, errorMessage => {
          this.error = errorMessage;
          this.isLoading = false;
        });
    }
  }
}
