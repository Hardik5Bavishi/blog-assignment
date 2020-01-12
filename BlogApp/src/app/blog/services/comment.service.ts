import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  getComments(userId: number, blogId: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/users/${userId}/blogs/${blogId}/comments`);
  }

  postComment(comment: Comment): Observable<any> {
    return this._http.post(`${this.baseUrl}/users/${comment.userId}/blogs/${comment.blogId}/comments`, comment);
  }

  deleteComment(userId: number, blogId: number, commentId: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/users/${userId}/blogs/${blogId}/comments/${commentId}`);
  }
}
