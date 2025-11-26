import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import passwordValidator from 'src/utils/password-validator';
import { ThemeService } from '../services/theme.service';
import { Theme } from '../../models/Theme';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss'],
})
export class MeComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private snackBar: MatSnackBar
  ) {}

  meForm!: FormGroup;
  subscribedThemes!: Theme[];

  ngOnInit(): void {
    this.getThemesSubscribed();
    this.createForm();
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
      password: ['', [Validators.required, passwordValidator]],
    });
  }
}
