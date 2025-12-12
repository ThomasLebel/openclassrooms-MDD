import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() actualPage: string = '';
  isOnMobile: boolean = false;
  isDrawerOpen: boolean = false;
  isAuthenticated: boolean = this.authService.isAuthenticated();

  constructor(private authService: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.onResize();
    console.log(this.isAuthenticated);
  }

  @HostListener('window:resize')
  onResize() {
    if (window.innerWidth < 1024) {
      this.isOnMobile = true;
    } else {
      this.isOnMobile = false;
    }
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
