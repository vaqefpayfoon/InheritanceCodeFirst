import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { User, WholeUserData, EmployeeSave } from '../_models/user';
import { Employee } from '../_models/employee';
import { Employer } from '../_models/employer';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  currentEmployee: Employee;
  currentEmployer: Employer;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();
  userId: any;
  constructor(private http: HttpClient) {}

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          localStorage.setItem('employee', JSON.stringify(user.employee));
          localStorage.setItem('employer', JSON.stringify(user.employer));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
          this.currentEmployee = user.employee;
          this.currentEmployer = user.employer;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      })
    );
  }
  login2(model: any) {
    return this.http.post(this.baseUrl + 'login', model).subscribe(
      (response) => {
         console.log(response);
      }
    );
  }

  register(wholeUser: WholeUserData) {

    let password: string = wholeUser.password;
    let employeeSave: EmployeeSave = {wholeuserData: wholeUser, password: password};
    return this.http.post(this.baseUrl + 'register', employeeSave, {observe: 'response'}).pipe(map(
      (response: any) => {
        const createdUser = response.body;
         this.userId = createdUser.id;
      }
    ));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + id);
  }
}
