import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Theme } from '../../models/Theme';
import { ThemeService } from '../services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private snackBar: MatSnackBar
  ) {}

  createForm!: FormGroup;
  themes!: Theme[];
  items: string[] = [];

  ngOnInit(): void {
    this.getThemeList();
    this.createForm = this.formBuilder.group({
      theme: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  private getThemeList() {
    this.themeService.getAllThemes().subscribe({
      next: (response) => {
        this.themes = response;
      },
      error: (err) =>
        this.snackBar.open(
          'Une erreur est survenue lors de la récupération des thèmes',
          'Fermer',
          { duration: 3000 }
        ),
    });
  }
}
