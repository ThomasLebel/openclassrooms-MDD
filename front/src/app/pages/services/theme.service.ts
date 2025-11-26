import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Theme } from '../../models/Theme';
import MessageResponse from '../../core/interfaces/responses/messageResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private url = 'http://localhost:8080/';
  private pathService = 'api/themes';

  constructor(private httpClient: HttpClient) {}

  public getAllThemes(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(`${this.url}${this.pathService}`);
  }

  public getSubscribedThemes(): Observable<Theme[]> {
    return this.httpClient.get<Theme[]>(
      `${this.url}${this.pathService}/subscribed`
    );
  }

  public subscribe(id: number): Observable<MessageResponse> {
    return this.httpClient.put<MessageResponse>(
      `${this.url}${this.pathService}/subscribe/${id}`,
      {}
    );
  }

  public unsubscribe(id: number): Observable<MessageResponse> {
    return this.httpClient.put<MessageResponse>(
      `${this.url}${this.pathService}/unsubscribe/${id}`,
      {}
    );
  }
}
