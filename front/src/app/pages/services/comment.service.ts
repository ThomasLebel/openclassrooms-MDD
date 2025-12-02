import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CommentCreateRequest from '../../core/interfaces/requests/commentCreateRequest.interface';
import { Observable } from 'rxjs';
import CommentResponse from '../../core/interfaces/responses/commentResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = 'http://localhost:8080/';
  private pathService = 'api/comments';

  constructor(private httpClient: HttpClient) {}

  public create(
    commentCreateRequest: CommentCreateRequest
  ): Observable<CommentResponse> {
    return this.httpClient.post<CommentResponse>(
      `${this.url}${this.pathService}/create`,
      commentCreateRequest
    );
  }
}
