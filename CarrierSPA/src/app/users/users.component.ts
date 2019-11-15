import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { UserService } from '../_services/user.service';
import { WholeUserData } from '../_models/user';
import { City } from '../_models/city';
import { CityService } from '../_services/city.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  rows = [];
  temp = [];
  loadingIndicator: boolean = true;
  reorderable: boolean = true;

  columns = [
    { prop: 'name', summaryFunc: () => null },
    { name: 'Gender', summaryFunc: (cells) => this.summaryForGender(cells) },
    { name: 'Company', summaryFunc: () => null }
  ];
  cityColumns = [
    { prop: 'name', summaryFunc: () => null },
    { name: 'Gender', summaryFunc: (cells) => this.summaryForGender(cells) },
    { name: 'Company', summaryFunc: () => null }
  ];
  WholeUsercolumns = [
    {prop: 'id', summaryFunc: () => null},
    {name: 'username', summaryFunc: () => null},
    {name: 'password', summaryFunc: () => null},
    {name: 'fullName', summaryFunc: () => null},
    {name: 'website', summaryFunc: () => null},
    {name: 'age', summaryFunc: () => null},
    {name: 'lastActive', summaryFunc: () => null},
    {name: 'cv', summaryFunc: () => null},
    {name: 'moreInfo', summaryFunc: () => null},
    {name: 'section', summaryFunc: () => null},
    {name: 'photoUrl', summaryFunc: () => null},
    {name: 'userType', summaryFunc: () => null},
    {name: 'cityId', summaryFunc: () => null},
    {name: 'email', summaryFunc: () => null},
    {name: 'phone', summaryFunc: () => null},
    {name: 'gender', summaryFunc: () => null},
    {name: 'carrierId', summaryFunc: () => null},
    {name: 'salaryId', summaryFunc: () => null},
    {name: 'universityId', summaryFunc: () => null},
    {name: 'universityInfo', summaryFunc: () => null},
    {name: 'address', summaryFunc: () => null}
  ];
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  wholeUserDatas: WholeUserData[];
  cities: City[];
  wholeUserData: WholeUserData;
  constructor(userService: UserService, cityService: CityService) {
    // this.fetch((data) => {
    //   this.temp = [...data];
    //   this.rows = data;
    //   setTimeout(() => { this.loadingIndicator = false; }, 1500);
    // });
    setTimeout(() => {
      userService.getUsers().subscribe((wholeUserData: WholeUserData[]) => {
        this.wholeUserDatas = wholeUserData;
        this.temp = wholeUserData;
        console.log(this.wholeUserDatas);
      });
      // cityService.getCities().subscribe((city: City[]) => {
      //   this.cities = city;
      // })
    }, 800);
  }
  ngOnInit() {
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  private summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === 'male').length;
    const females = cells.filter(cell => cell === 'female').length;

    return `males: ${males}, females: ${females}`;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.username.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    //this.rows = temp;
    this.wholeUserDatas = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}
