import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  _subject = new Subject<any>();
  constructor(private router: Router) {
  }

  setUsername(username: string) {
    sessionStorage.setItem('Username', username);
  }

  getUsername() {
    return sessionStorage.getItem('Username');
  }

  setUserId(userId: number) {
    sessionStorage.setItem('UserId', userId.toString());
  }

  getUserId() {
    return +sessionStorage.getItem('UserId');
  }

  setAvatar(avatarUrl: string) {
    sessionStorage.setItem('Avatar', avatarUrl);
  }

  getAvatar() {
    return sessionStorage.getItem('Avatar');
  }

  logout(): void {
    sessionStorage.removeItem('Username');
    sessionStorage.removeItem('UserId');
    sessionStorage.removeItem('Avatar');
    this.router.navigate(['home']);
    this._subject.next(false);
  }

  onLogin(): void {
    this._subject.next(true);
  }
}
