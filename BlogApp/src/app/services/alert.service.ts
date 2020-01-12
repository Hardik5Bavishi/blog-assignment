import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  success(msg: string): void {
    this.snackBar.open(msg, 'OK', {
      verticalPosition: 'top',
      duration: 2500
    });
  }

  error(msg: string): void {
    this.snackBar.open(msg, 'Error', {
      verticalPosition: 'top',
      duration: 3000
    });
  }
}
