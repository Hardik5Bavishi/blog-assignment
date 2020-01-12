import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentService } from './services/comment.service';
import { CommonService } from '../services/common.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Comment } from './models/comment';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  @Input() blog: any;
  @Input() isMyBlog: boolean;
  @Output() onEditBlog = new EventEmitter();
  @Output() onDeleteBlog = new EventEmitter();
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;
  commentObj: Comment;
  comments: any;
  isLoggedInUser: boolean;
  loggedInUserAvatar: string;
  userId: number;

  constructor(private _commentService: CommentService,
    private _commonService: CommonService,
    private _dialog: MatDialog,
    private _alertService: AlertService
  ) {
    this.commentObj = new Comment();
    this.userId = this._commonService.getUserId();
  }

  ngOnInit() {
    if (this.blog) {
      this._commentService.getComments(this.blog.userId, this.blog.id).subscribe(res => {
        this.comments = res;
      });
    }

    if (this.userId) {
      this.isLoggedInUser = true;
      this.loggedInUserAvatar = this._commonService.getAvatar();
    }

    this._commonService._subject.subscribe(res => {
      this.userId = this._commonService.getUserId();
      this.isLoggedInUser = res;
    });
  }

  edit() {
    this.onEditBlog.emit(this.blog);
  }

  delete(): void {
    this.confirmDialogRef = this._dialog.open(ConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.customMessage = "Are you sure want to delete blog?";

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.onDeleteBlog.emit(this.blog.id);
        this.confirmDialogRef = null;
      }
    });
  }

  postComment(): void {
    this.commentObj.blogId = this.blog.id;
    this.commentObj.userId = this.userId;
    this.commentObj.name = this._commonService.getUsername();
    this._commentService.postComment(this.commentObj).subscribe(res => {
      alert(`${this.userId} - ${res.userId}`);
      this.comments.push(res);
      this._alertService.success('Comment added successfully');
      this.commentObj = new Comment();
    }, error => {
      this._alertService.success('Failed to post comment');
    })
  }

  deleteComment(userId: number, blogId: number, commentId: number): void {
    this._commentService.deleteComment(userId, blogId, commentId).subscribe(res => {
      const index = this.comments.findIndex(c => c.id == commentId);
      this.comments.splice(index, 1);
      this._alertService.success('Comment deleted successfully');
    }, error => {
      this._alertService.success('Failed to post comment');
    });
  }

  setDefaultPic(): void {
    this.blog.blogImage = "https://carolinadojo.com/wp-content/uploads/2017/04/default-image.jpg";
  }

  setBlogDefaultAvatar(): void {
    this.blog.avatar = 'https://anotherjavaduke.files.wordpress.com/2018/08/avataaars-2.png';
  }

  setCommentDefaultAvatar(index: number) {
    this.blog.comments[index].avatar = 'https://anotherjavaduke.files.wordpress.com/2018/08/avataaars-2.png';
  }

  setUserDefaultAvatar(): void {
    this.loggedInUserAvatar = 'https://anotherjavaduke.files.wordpress.com/2018/08/avataaars-2.png';
  }


}
