import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  public getBlogsById(userId: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/users/${userId}/blogs`);
  }

  public createBlog(userId: number, blog: Blog): Observable<any> {
    return this._http.post(`${this.baseUrl}/users/${userId}/blogs`, blog);
  }

  public updateBlog(userId: number, blog: Blog): Observable<any> {
    return this._http.put(`${this.baseUrl}/users/${userId}/blogs/${blog.id}`, blog);
  }

  public deleteBlog(userId: number, blogId: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/users/${userId}/blogs/${blogId}`);
  }

}