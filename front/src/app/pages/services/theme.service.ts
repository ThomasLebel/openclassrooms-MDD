import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Theme from '../interfaces/theme.interface';

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
}
