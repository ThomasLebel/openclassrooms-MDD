import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterLink } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ArticleCardComponent } from './article-card/article-card.component';
import { SideNavComponent } from './header/components/side-nav/side-nav.component';
import { HeaderComponent } from './header/header.component';
import { ThemeCardComponent } from './theme-card/theme-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideNavComponent,
    ArticleCardComponent,
    ThemeCardComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterLink,
    MatButtonModule,
  ],
  exports: [
    HeaderComponent,
    SideNavComponent,
    ArticleCardComponent,
    ThemeCardComponent,
  ],
})
export class SharedModule {}
