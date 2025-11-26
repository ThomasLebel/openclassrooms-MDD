import { Component, OnInit } from '@angular/core';
import { Theme } from '../../models/Theme';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss'],
})
export class ThemesComponent implements OnInit {
  themes: Theme[] = [];
  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.getAllThemes().subscribe({
      next: (response) => {
        this.themes = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
