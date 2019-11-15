import { Component, OnInit } from '@angular/core';
import { WholeUserData, User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  users: WholeUserData[];
  user: WholeUserData = JSON.parse(localStorage.getItem('user'));
  genderList = [{value: 'Other', display: '...'}, {value: 'Male', display: 'Male'}, {value: 'Female', display: 'Female'}];
  userParams: any = {};
  pagination: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.userParams.userId = user.id;

    // this.userService.getUsers2().subscribe(response => {
    //    this.users = response.body;
    //    this.pagination = JSON.parse(response.headers.get('Pagination'));
    // });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.pagination.currentPage = 1;
    this.pagination.itemsPerPage = 20;
    this.loadUsers();
  }

  loadUsers() {
    if(this.userParams.gender === undefined)
      this.userParams.gender = 'Other';
    this.userService.getAllUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<WholeUserData[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

}
