import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WholeUserData } from '../_models/user';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl + 'auth';

  constructor(private http: HttpClient) {}
  wholeUserDatas: WholeUserData[];

  getUsers(): Observable<WholeUserData[]> {
    return this.http.get<WholeUserData[]>(this.baseUrl + "/getUsers", { observe: 'response'})
    .pipe(map((response: any) => { this.wholeUserDatas = response.body;
      return this.wholeUserDatas;
    }));
  }


  getAllUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<WholeUserData[]>> {
    const paginatedResult: PaginatedResult<WholeUserData[]> = new PaginatedResult<WholeUserData[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (userParams != null) {
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }
    return this.http.get<WholeUserData[]>(this.baseUrl + "/getAllUsers", { observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') != null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }
}
