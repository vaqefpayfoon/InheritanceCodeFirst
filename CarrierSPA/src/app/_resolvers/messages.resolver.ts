import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

@Injectable({ providedIn: 'root' })
export class MessagesResolver implements Resolve<User> {
  resolve(route: ActivatedRouteSnapshot): Observable<User> | Promise<User> | User {
    return ;
  }
}
