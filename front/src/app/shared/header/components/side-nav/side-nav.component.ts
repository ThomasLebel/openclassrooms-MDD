import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('drawerAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class SideNavComponent implements OnInit {
  @Output() toggleDrawer = new EventEmitter<void>();
  @Output() disconnect = new EventEmitter<void>();
  @Input() isDrawerOpen: boolean = false;
  @Input() actualPage: string = '';

  constructor() {}

  ngOnInit(): void {}

  toggleDrawerEvent() {
    this.toggleDrawer.emit();
  }
}
