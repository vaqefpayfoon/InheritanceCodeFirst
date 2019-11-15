import { Component, OnInit } from '@angular/core';
import { WholeUserData } from '../_models/user';
import { PaginatedResult, Pagination } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  users: WholeUserData[];
  user: WholeUserData = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  userParams: any = {};
  pagination: Pagination;
  constructor(private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.userService.getAllUsers(1, 5)
    .subscribe((res: PaginatedResult<WholeUserData[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
  }, error => {
    this.alertify.error(error);
  });
  }
  registerToggle() {
    this.registerMode = true;
  }
  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
