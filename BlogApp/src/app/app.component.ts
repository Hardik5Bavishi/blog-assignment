import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'BlogApp';
  isLoggedIn: boolean;
  username: string;
  userAvatar: string;

  constructor(public _dialog: MatDialog,
    private _commonService: CommonService) {
  }

  ngOnInit() {
    if (this._commonService.getUserId()) {
      this.isLoggedIn = true;
      this.username = this._commonService.getUsername();
      this.userAvatar = this._commonService.getAvatar();
    }
    this._commonService._subject.subscribe(res => {
      this.isLoggedIn = res;
    });
  }

  login(): void {
    const dialogRef = this._dialog.open(LoginComponent, {
      width: '400px'
    });

    dialogRef.componentInstance.loggedIn.subscribe(res => {
      debugger;
      this._commonService.setUserId(res.id);
      this._commonService.setUsername(res.username);
      this._commonService.setAvatar(res.avatar);
      this.userAvatar = res.avatar;
      this.username = res.username;
      this.isLoggedIn = true;
      this._commonService.onLogin();
    });
  }

  logout(): void {
    this._commonService.logout();
    this.isLoggedIn = false;
  }

  setUserDefaultAvatar(): void {
    this.userAvatar = 'https://anotherjavaduke.files.wordpress.com/2018/08/avataaars-2.png';
  }
}
