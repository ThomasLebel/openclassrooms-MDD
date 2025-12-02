import { Component, OnInit } from '@angular/core';
import { Theme } from '../../models/Theme';
import { ThemeService } from '../services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
})
export class ThemesComponent implements OnInit {
  themes: Theme[] = [];
  constructor(
    private themeService: ThemeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllThemes();
  }

  private getAllThemes() {
    this.themeService.getAllThemes().subscribe({
      next: (response) => {
        this.themes = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onUnsubscribeClick(themeId: number) {
    this.themeService.unsubscribe(themeId).subscribe({
      next: (response) => {
        const theme = this.themes.find((t) => t.id === themeId);
        if (theme) {
          theme.subscribed = false;
        }
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

  onSubscribeClick(themeId: number) {
    this.themeService.subscribe(themeId).subscribe({
      next: (response) => {
        const theme = this.themes.find((t) => t.id === themeId);
        if (theme) {
          theme.subscribed = true;
        }
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
