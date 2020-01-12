import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  declarations: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ConfirmDialogModule { }
