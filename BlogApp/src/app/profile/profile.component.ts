import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { ProfileService } from './service/profile.service';
import { CommonService } from '../services/common.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { AlertService } from '../services/alert.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User;
  userId: number;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  form: FormGroup;

  constructor(private profileService: ProfileService,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
    private _commonService: CommonService,
    private _alertService: AlertService) {
    this.userId = this._commonService.getUserId();
  }

  ngOnInit() {
    this.user = new User();
    this.getUserInfo();
    this.form = this._formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  getUserInfo(): void {
    this.profileService.getUserInfo(this.userId).subscribe(res => {
      this.user = res;
    });
  }

  updateUser(): void {
    this.profileService.updateUser(this.userId, this.user).subscribe(res => {
      this._alertService.success('Profile updated successfully.');
      this.user = res;
    }, (error) => {
      this._alertService.error('Failed to update');
    })
  }

  deleteUser(): void {
    this.confirmDialogRef = this._dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });
    this.confirmDialogRef.componentInstance.customMessage = "Are you sure want to delete your account permanently?";
    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.profileService.deleteUser(this.userId).subscribe(res => {
          this._commonService.logout();
          this._alertService.success('Profile delete successfully.');
        },
          (error) => {
            this._alertService.error('Failed to update');
          });
      }
    });
  }

}
