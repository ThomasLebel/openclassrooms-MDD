import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import MessageResponse from '../../core/interfaces/responses/messageResponse.interface';
import { Article } from '../../models/Article';
import ArticleCreateRequest from '../../core/interfaces/requests/articleCreateRequest.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private url = 'http://localhost:8080/';
  private pathService = 'api/articles';

  constructor(private httpClient: HttpClient) {}

  public create(
    articleCreateRequest: ArticleCreateRequest
  ): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(
      `${this.url}${this.pathService}/create`,
      articleCreateRequest
    );
  }

  public getSubscribedArticles(): Observable<Article[]> {
    return this.httpClient.get<Article[]>(`${this.url}${this.pathService}`);
  }

  public getArticleById(id: string): Observable<Article> {
    return this.httpClient.get<Article>(`${this.url}${this.pathService}/${id}`);
  }
}
