import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';
import passwordValidator from 'src/utils/password-validator';
import LoginRequest from '../../core/interfaces/requests/loginRequest.interface';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private sessionService: SessionService,
    private authService: AuthService,
    private router: Router
  ) {}

  errorMessage = '';
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, passwordValidator]],
    });
  }

  onSubmitForm() {
    this.errorMessage = '';
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        login: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
      };

      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          this.sessionService.login(response.token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.errorMessage = err.error?.error || 'Une erreur est survenue';
        },
      });
    }
  }
}
