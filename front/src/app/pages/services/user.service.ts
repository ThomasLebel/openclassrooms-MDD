import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
import UserUpdateRequest from '../../core/interfaces/requests/userUpdateRequest.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private pathService = 'user';
  constructor(private httpClient: HttpClient) {}

  public getUserInfos(): Observable<User> {
    return this.httpClient.get<User>(
      `${environment.apiUrl}${this.pathService}`
    );
  }

  public updateUserInfos(
    userUpdateRequest: UserUpdateRequest
  ): Observable<User> {
    return this.httpClient.put<User>(
      `${environment.apiUrl}${this.pathService}`,
      userUpdateRequest
    );
  }
}
