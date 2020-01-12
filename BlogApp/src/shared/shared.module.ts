import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule,
  MatDividerModule, MatSelectModule, MatFormFieldModule, MatTableModule, MatInputModule, MatDialogModule, MatMenuModule, MatSnackBarModule
} from '@angular/material';

import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    FlexLayoutModule,
    MatDialogModule,
    MatMenuModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSelectModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FlexLayoutModule,
    MatMenuModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
