import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  id: any;
  register: boolean = true;
  constructor(public authService: AuthService, private alertify: AlertifyService,
      private router: Router) { }

  ngOnInit() {
    // if(this.loggedIn())
    //   this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);

  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged in successfully');
      this.register = false;
      this.id = this.authService.decodedToken.nameid;
      this.photoUrl = this.authService.currentUser.photoUrl;
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/page', this.authService.decodedToken.nameid]);
    });
    //this.authService.login2(this.model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
    this.register = false;
  }

  registerClicked() {
    var t2 = document.getElementById('btnRegister') as HTMLButtonElement;
    if(t2.innerText == "Register") {
      t2.innerText = "Cancel";
      this.router.navigate(['/register']);
    } else {
      t2.innerText = "Register";
      this.router.navigate(['/home']);
    }
  }

}
