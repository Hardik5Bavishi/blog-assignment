import { Component, OnInit } from '@angular/core';
import { BlogService } from './services/blog.service';
import { CommonService } from '../services/common.service';
import { MatDialog } from '@angular/material';
import { CreateBlogComponent } from './create-blog/create-blog.component';
import { Blog } from './models/blog';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-my-blog',
  templateUrl: './my-blog.component.html',
  styleUrls: ['./my-blog.component.scss']
})
export class MyBlogComponent implements OnInit {
  userId: number;
  blogs: Blog[] = [];

  constructor(private _blogService: BlogService,
    private _commonService: CommonService,
    public _dialog: MatDialog,
    private _alertService: AlertService
  ) {
    this.userId = this._commonService.getUserId();
  }

  ngOnInit() {
    this.getUserBlogs();
  }

  getUserBlogs(): void {
    this._blogService.getBlogsById(this.userId).subscribe(res => {
      this.blogs = res;
      this.blogs.map(r => r.username = this._commonService.getUsername())
    })
  }

  create(): void {
    const dialogRef = this._dialog.open(CreateBlogComponent, {
      width: '600px'
    });

    dialogRef.componentInstance.onSave.subscribe(res => {
      if (res) {
        res.username = this._commonService.getUsername();
        this.blogs.push(res);
        this._alertService.success('Blog created successfully.');
      }
    }, (error) => {
      this._alertService.error('Failed to create');
    });

  }

  editBlog(blog: Blog): void {
    const dialogRef = this._dialog.open(CreateBlogComponent, {
      width: '600px'
    });

    dialogRef.componentInstance.blog = blog;

    dialogRef.componentInstance.onSave.subscribe(res => {
      if (res) {
        res.username = this._commonService.getUsername();
        const index = this.blogs.findIndex(b => b.id == res.id);
        this.blogs[index] = res;
        this._alertService.success('Blog updated successfully.');
      }
    }, (error) => {
      this._alertService.error('Failed to update');
    });
  }

  deleteBlog(blogId: number): void {
    this._blogService.deleteBlog(this.userId, blogId).subscribe(res => {
      const index = this.blogs.findIndex(b => b.id == res.id);
      this.blogs.splice(index, 1);
      this._alertService.success('Blog deleted successfully.');
    }, (error) => {
      this._alertService.error('Failed to delete');
    });
  }

}
