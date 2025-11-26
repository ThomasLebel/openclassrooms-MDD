import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CommentCreateRequest from '../../core/interfaces/requests/commentCreateRequest.interface';
import MessageResponse from '../../core/interfaces/responses/messageResponse.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private url = 'http://localhost:8080/';
  private pathService = 'api/comments';

  constructor(private httpClient: HttpClient) {}

  public create(
    commentCreateRequest: CommentCreateRequest
  ): Observable<MessageResponse> {
    return this.httpClient.post<MessageResponse>(
      `${this.url}${this.pathService}/create`,
      commentCreateRequest
    );
  }
}
