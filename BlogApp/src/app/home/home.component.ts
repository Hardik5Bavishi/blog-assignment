import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from './services/home.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  users: any;
  blogs: any = [];
  constructor(private homeService: HomeService,
    private _commonService: CommonService,
  ) { }

  ngOnInit() {
    this.getUsers();
    this._commonService._subject.subscribe(res => {
      this.getUsers();
    });
  }

  getUsers(): void {
    this.homeService.getUsers().subscribe(res => {
      this.users = res;
      res.forEach(element => {
        this.setBlogs(element.blogs, element.username);
      });
    });
  }

  setBlogs(blogs: any, username: string): void {
    blogs.forEach(element => {
      element['username'] = username;
      this.blogs.push(element);
    });
  }
}
