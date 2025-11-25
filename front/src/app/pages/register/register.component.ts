import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import passwordValidator from 'src/utils/password-validator';
import { AuthService } from '../../core/services/auth.service';
import { SessionService } from '../../core/services/session.service';
import RegisterRequest from '../../core/interfaces/registerRequest.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,

    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService
  ) {}

  registerForm!: FormGroup;
  errorMessage: string = '';

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          ),
        ],
      ],
      password: ['', [Validators.required, passwordValidator]],
    });
  }

  onSubmitForm() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      const registerRequest: RegisterRequest = {
        username: this.registerForm.get('username')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value,
      };

      this.authService.register(registerRequest).subscribe({
        next: (response) => {
          this.router.navigate(['/']);
          this.sessionService.login(response.token);
        },
        error: (err) =>
          (this.errorMessage = err.error?.error || 'Une erreur est survenue'),
      });
    }
  }
}
