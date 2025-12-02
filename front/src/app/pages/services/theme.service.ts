import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../../models/Theme';
import MessageResponse from '../../core/interfaces/responses/messageResponse.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private pathService = 'themes';

  constructor(private httpClient: HttpClient) {}

  public getAllThemes(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(
      `${environment.apiUrl}${this.pathService}`
    );
  }

  public getSubscribedThemes(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(
      `${environment.apiUrl}${this.pathService}/subscribed`
    );
  }

  public subscribe(id: number): Observable<MessageResponse> {
    return this.httpClient.put<MessageResponse>(
      `${environment.apiUrl}${this.pathService}/subscribe/${id}`,
      {}
    );
  }

  public unsubscribe(id: number): Observable<MessageResponse> {
    return this.httpClient.put<MessageResponse>(
      `${environment.apiUrl}${this.pathService}/unsubscribe/${id}`,
      {}
    );
  }
}
