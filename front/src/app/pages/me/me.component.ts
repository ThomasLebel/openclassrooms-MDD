import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import passwordValidator from 'src/utils/password-validator';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../../models/Theme';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';
import UserUpdateRequest from '../../core/interfaces/requests/userUpdateRequest.interface';
import { SessionService } from '../../core/services/session.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
})
export class MeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private userService: UserService,
    private sessionService: SessionService,
    private snackBar: MatSnackBar
  ) {}

  meForm!: FormGroup;
  subscribedThemes!: Theme[];

  ngOnInit(): void {
    this.createForm();
    this.getUserInfos();
    this.getThemesSubscribed();
  }

  private getUserInfos() {
    this.userService.getUserInfos().subscribe({
      next: (response) => {
        this.meForm.patchValue({
          username: response.username,
          email: response.email,
        });
      },
      error: (err) => {
        this.snackBar.open(
          'Une erreur est survenue lors de la récupération des infos utilisateur',
          'Fermer',
          { duration: 3000 }
        );
      },
    });
  }

  private getThemesSubscribed() {
    this.themeService.getSubscribedThemes().subscribe({
      next: (response) => (this.subscribedThemes = response),
      error: (err) =>
        this.snackBar.open(
          'Une erreur est survenue lors de la récupération des thèmes',
          'Fermer',
          { duration: 3000 }
        ),
    });
  }

  private createForm() {
    this.meForm = this.formBuilder.group({
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
      password: [null],
    });
  }

  public onSubmitForm() {
    const passwordControl = this.meForm.get('password');

    if (passwordControl?.value) {
      passwordControl.setValidators([Validators.required, passwordValidator]);
    } else {
      passwordControl?.clearValidators();
    }
    passwordControl?.updateValueAndValidity();
    this.meForm.markAllAsTouched();
    if (this.meForm.valid) {
      const userUpdateRequest: UserUpdateRequest = {
        username: this.meForm.get('username')?.value,
        email: this.meForm.get('email')?.value,
        password: this.meForm.get('password')?.value,
      };
      this.userService.updateUserInfos(userUpdateRequest).subscribe({
        next: (response) => {
          if (response.token) {
            this.sessionService.login(response.token);
          }
          this.meForm.patchValue({
            password: '',
          });
          this.snackBar.open(
            'Informations modifiées avec succès ✅',
            'Fermer',
            {
              duration: 3000,
            }
          );
        },
        error: (err) => {
          this.snackBar.open(
            'Une erreur est survenue lors de la modification des infos',
            'Fermer',
            {
              duration: 3000,
            }
          );
        },
      });
    }
  }

  public onUnsubscribeClick(themeId: number) {
    this.themeService.unsubscribe(themeId).subscribe({
      next: (response) => {
        this.getThemesSubscribed();
      },
      error: (err) => {
        this.snackBar.open(
          "Une erreur est survenue lors de l'abonnement",
          'Fermer',
          { duration: 3000 }
        );
      },
    });
  }
}
