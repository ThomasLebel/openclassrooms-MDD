import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthPageComponent } from './home/components/auth-page/auth-page.component';
import { FeedComponent } from './home/components/feed/feed.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ThemesComponent } from './themes/themes.component';

@NgModule({
  declarations: [
    HomeComponent,
    AuthPageComponent,
    LoginComponent,
    RegisterComponent,
    FeedComponent,
    ThemesComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    HomeComponent,
    AuthPageComponent,
    LoginComponent,
    RegisterComponent,
    FeedComponent,
    ThemesComponent,
  ],
})
export class PagesModule {}
