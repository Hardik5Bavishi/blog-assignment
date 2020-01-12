import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SignUp } from './models/sign-up';
import { AuthenticationService } from './services/authentication.service';
import { HomeService } from '../home/services/home.service';
import { Login } from './models/login';
import { MatDialogRef } from '@angular/material';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() loggedIn = new EventEmitter();
  
  isLogin = true;
  userRegisterObj: SignUp;
  userLoginObj: Login;
  signedUp: boolean;
  user: any;
  inValidUsername: boolean;

  constructor(private _authenticationService: AuthenticationService,
    private _homeService: HomeService,
    public _dialogRef: MatDialogRef<LoginComponent>,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
    this.userRegisterObj = new SignUp();
    this.userLoginObj = new Login();
  }

  public signUp(): void {
    this.isLogin = false;
  }

  cancel(): void {
    this.isLogin = true;
  }

  register(): void {
    this._authenticationService.Register(this.userRegisterObj).subscribe(res => {
      this.signedUp = true;
      this.isLogin = true;
      this._alertService.success('logged in successfully');
    });
  }

  login(): void {
    this._homeService.getUsers().subscribe(res => {
      this.user = res.filter(r => r.username == this.userLoginObj.username && r.password == this.userLoginObj.password);
      if (this.user.length > 0) {
        this.loggedIn.emit(this.user[0]);
        this._dialogRef.close(false);
        this._alertService.success('logged in successfully');
      } else {
        this.inValidUsername = true;
      };
    });
  }
}
