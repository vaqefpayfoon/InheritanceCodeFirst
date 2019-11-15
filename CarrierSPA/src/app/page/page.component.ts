import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService) { }
  user: User;
  ngOnInit() {
    //this.user = JSON.parse(localStorage.getItem('user'));
    //this.user = this.authService.currentUser;
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

  }

}
