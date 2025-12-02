import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Theme } from '../../models/Theme';
import { ThemeService } from '../../pages/services/theme.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-theme-card',
  templateUrl: './theme-card.component.html',
  styleUrls: ['./theme-card.component.scss'],
})
export class ThemeCardComponent implements OnInit {
  @Output() subscribeClickEvent = new EventEmitter<number>();
  @Output() unsubscribeClickEvent = new EventEmitter<number>();
  @Input() theme!: Theme;

  constructor(
    private themeService: ThemeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubscribeClick() {
    this.subscribeClickEvent.emit(this.theme.id);
  }

  onUnsubscribeClick() {
    this.unsubscribeClickEvent.emit(this.theme.id);
  }
}
