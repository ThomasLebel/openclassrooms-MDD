import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import CommentCreateRequest from '../../core/interfaces/requests/commentCreateRequest.interface';
import { Observable } from 'rxjs';
import CommentResponse from '../../core/interfaces/responses/commentResponse.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private pathService = 'comments';

  constructor(private httpClient: HttpClient) {}

  public create(
    commentCreateRequest: CommentCreateRequest
  ): Observable<CommentResponse> {
    return this.httpClient.post<CommentResponse>(
      `${environment.apiUrl}${this.pathService}/create`,
      commentCreateRequest
    );
  }
}
