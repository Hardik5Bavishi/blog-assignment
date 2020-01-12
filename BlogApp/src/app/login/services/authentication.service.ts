import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUp } from '../models/sign-up';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = environment.baseUrl;
  constructor(private _http: HttpClient) { }

  Register(signUp: SignUp): Observable<any> {
    return this._http.post(`${this.baseUrl}/users`, signUp)
  }
}
