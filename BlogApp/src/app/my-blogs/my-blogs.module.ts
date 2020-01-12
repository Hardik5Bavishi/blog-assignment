import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyBlogComponent } from './my-blog.component';
import { Routes, RouterModule } from '@angular/router';
import { BlogModule } from '../blog/blog.module';
import { SharedModule } from 'src/shared/shared.module';
import { CreateBlogComponent } from './create-blog/create-blog.component';

const routes: Routes = [
  {
    path: '',
    component: MyBlogComponent
  }
];

@NgModule({
  declarations: [MyBlogComponent, CreateBlogComponent],
  entryComponents: [CreateBlogComponent],
  imports: [
    CommonModule,
    BlogModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MyBlogsModule { }
