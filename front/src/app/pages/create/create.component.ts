import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Theme } from '../../models/Theme';
import { ThemeService } from '../services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from '../services/article.service';
import ArticleCreateRequest from '../../core/interfaces/requests/articleCreateRequest.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private snackBar: MatSnackBar,
    private router: Router,
    private articleService: ArticleService
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

  public createArticle() {
    this.createForm.markAllAsTouched();
    if (this.createForm.valid) {
      const articleRequest: ArticleCreateRequest = {
        title: this.createForm.get('title')?.value,
        content: this.createForm.get('content')?.value,
        themeId: parseInt(this.createForm.get('theme')?.value),
      };
      this.articleService.create(articleRequest).subscribe({
        next: (response) => {
          this.snackBar.open('Article créé avec succès ✅', 'Fermer', {
            duration: 3000,
          }),
            this.router.navigate(['']);
        },
        error: (err) =>
          this.snackBar.open(
            "Une erreur est survenue lors de la création de l'article",
            'Fermer',
            { duration: 3000 }
          ),
      });
    }
  }
}
