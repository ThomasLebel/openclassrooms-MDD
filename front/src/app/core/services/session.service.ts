import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private tokenKey = 'auth_token';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  token$ = this.tokenSubject.asObservable();

  isAuthenticated$: Observable<boolean> = this.token$.pipe(
    map((token) => !!token)
  );

  constructor() {
    const savedToken = localStorage.getItem(this.tokenKey);
    if (savedToken) {
      this.tokenSubject.next(savedToken);
    }
  }

  login(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this.tokenSubject.next(token);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.tokenSubject.value;
  }
}
