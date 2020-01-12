import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Blog } from '../models/blog';
import { BlogService } from '../services/blog.service';
import { CommonService } from 'src/app/services/common.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.scss']
})
export class CreateBlogComponent implements OnInit {

  @Output() onSave = new EventEmitter();

  blog: Blog;

  constructor(private _blogService: BlogService,
    private _commonService: CommonService,
    private _dialogRef: MatDialogRef<CreateBlogComponent>
  ) {
    this.blog = new Blog();
  }

  ngOnInit() {
  }

  save(): void {
    const userId = this._commonService.getUserId();
    if (this.blog.id) {
      this._blogService.updateBlog(userId, this.blog).subscribe(res => {
        this.onSave.emit(res);
      })
    } else {
      this._blogService.createBlog(userId, this.blog).subscribe(res => {
        this.onSave.emit(res);
      });
    }
    this._dialogRef.close(false);
  }

  cancel(): void {
    this._dialogRef.close(false);
  }

}
