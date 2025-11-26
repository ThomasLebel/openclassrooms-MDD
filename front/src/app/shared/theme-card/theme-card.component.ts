import { Component, Input, OnInit } from '@angular/core';
import { Theme } from '../../models/Theme';
import { ThemeService } from '../../pages/services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-theme-card',
  templateUrl: './theme-card.component.html',
  styleUrls: ['./theme-card.component.scss'],
})
export class ThemeCardComponent implements OnInit {
  @Input()
  theme!: Theme;

  isLoading = false;

  constructor(
    private themeService: ThemeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubscribeClick() {
    this.isLoading = true;
    this.themeService.subscribe(this.theme.id).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.theme.subscribed = true;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open(
          "Une erreur est survenue lors de l'abonnement",
          'Fermer',
          { duration: 3000 }
        );
      },
    });
  }

  onUnsubscribeClick() {
    this.isLoading = true;
    this.themeService.unsubscribe(this.theme.id).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.theme.subscribed = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open(
          "Une erreur est survenue lors de l'abonnement",
          'Fermer',
          { duration: 3000 }
        );
      },
    });
  }
}
