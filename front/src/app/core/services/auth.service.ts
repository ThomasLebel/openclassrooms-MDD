import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import RegisterRequest from '../interfaces/requests/registerRequest.interface';
import { Observable } from 'rxjs';
import authResponse from '../interfaces/responses/authResponse.interface';
import LoginRequest from '../interfaces/requests/loginRequest.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private pathService = 'auth';

  constructor(private httpClient: HttpClient) {}

  public register(registerRequest: RegisterRequest): Observable<authResponse> {
    return this.httpClient.post<authResponse>(
      `${environment.apiUrl}${this.pathService}/register`,
      registerRequest
    );
  }

  public login(loginRequest: LoginRequest): Observable<authResponse> {
    return this.httpClient.post<authResponse>(
      `${environment.apiUrl}${this.pathService}/login`,
      loginRequest
    );
  }
}
