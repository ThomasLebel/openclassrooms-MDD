import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import MessageResponse from '../../core/interfaces/responses/messageResponse.interface';
import { Article } from '../../models/Article';
import ArticleCreateRequest from '../../core/interfaces/requests/articleCreateRequest.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private pathService = 'articles';

  constructor(private httpClient: HttpClient) {}

  public create(
    articleCreateRequest: ArticleCreateRequest
  ): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(
      `${environment.apiUrl}${this.pathService}/create`,
      articleCreateRequest
    );
  }

  public getSubscribedArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(
      `${environment.apiUrl}${this.pathService}`
    );
  }

  public getArticleById(id: string): Observable<Article> {
    return this.httpClient.get<Article>(
      `${environment.apiUrl}${this.pathService}/${id}`
    );
  }
}
