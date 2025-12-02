import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private sessionService: SessionService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.sessionService.logout();
          this.router.navigate(['']);
        }
        return throwError(() => err);
      })
    );
  }
}
