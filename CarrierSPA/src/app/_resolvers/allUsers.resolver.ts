import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../_services/alertify.service';
import { catchError } from 'rxjs/operators';
import { UserService } from '../_services/user.service';
import { WholeUserData } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AllUsersResolver implements Resolve<WholeUserData> {
  pageNumber = 1;
  pageSize = 5;
  constructor(private router: Router,
    private alertify: AlertifyService, private userService: UserService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<WholeUserData> {
      return this.userService.getAllUsers(this.pageNumber, this.pageSize).pipe(
      catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/home']);
          return of(null);
      })
  );
  }
}
