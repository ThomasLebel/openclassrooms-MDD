import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Observable } from 'rxjs';
import UserUpdateRequest from '../../core/interfaces/requests/userUpdateRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = 'http://localhost:8080/';
  private pathService = 'api/user';
  constructor(private httpClient: HttpClient) {}

  public getUserInfos(): Observable<User> {
    return this.httpClient.get<User>(`${this.url}${this.pathService}`);
  }

  public updateUserInfos(
    userUpdateRequest: UserUpdateRequest
  ): Observable<User> {
    return this.httpClient.put<User>(
      `${this.url}${this.pathService}`,
      userUpdateRequest
    );
  }
}
