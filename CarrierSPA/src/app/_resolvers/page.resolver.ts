import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../_models/User';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PageResolver implements Resolve<User> {
  constructor(private router: Router,
    private alertify: AlertifyService, private authService: AuthService) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.authService.getUser(route.params['id']).pipe(
      catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/page', this.authService.decodedToken.nameid]);
          return of(null);
      })
  );
  }
}
