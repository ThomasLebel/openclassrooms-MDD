import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import RegisterRequest from '../interfaces/registerRequest.interface';
import { Observable } from 'rxjs';
import authResponse from '../interfaces/authResponse.interface';
import LoginRequest from '../interfaces/loginRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/';
  private pathService = 'api/auth';

  constructor(private httpClient: HttpClient) {}

  public register(registerRequest: RegisterRequest): Observable<authResponse> {
    return this.httpClient.post<authResponse>(
      `${this.url}${this.pathService}/register`,
      registerRequest
    );
  }

  public login(loginRequest: LoginRequest): Observable<authResponse> {
    return this.httpClient.post<authResponse>(
      `${this.url}${this.pathService}/login`,
      loginRequest
    );
  }
}
