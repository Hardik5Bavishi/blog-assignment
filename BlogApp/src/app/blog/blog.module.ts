import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { SharedModule } from 'src/shared/shared.module';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [BlogComponent],
  exports: [BlogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConfirmDialogModule
  ]
})
export class BlogModule { }
