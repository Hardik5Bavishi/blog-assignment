import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  public getUserInfo(userId: number): Observable<any> {
    return this._http.get(`${this.baseUrl}/users/${userId}`);
  }

  public updateUser(userId: number, user: User): Observable<any> {
    return this._http.put(`${this.baseUrl}/users/${userId}`, user);
  }

  public deleteUser(userId: number): Observable<any> {
    return this._http.delete(`${this.baseUrl}/users/${userId}`);
  }
}
