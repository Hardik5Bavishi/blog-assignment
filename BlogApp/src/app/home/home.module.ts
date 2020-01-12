import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { BlogModule } from '../blog/blog.module';
import { SharedModule } from 'src/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  }
];


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    BlogModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
