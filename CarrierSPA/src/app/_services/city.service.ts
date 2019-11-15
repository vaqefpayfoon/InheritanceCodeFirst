import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { City } from '../_models/city';
import { map } from 'rxjs/operators';
import { Carrier } from '../_models/carrier';
import { University } from '../_models/university';
import { Country } from '../_models/country';
import { Salary } from '../_models/salary';
import { AutoComplete } from '../_models/dropDown';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  baseUrl = environment.apiUrl + 'entity';

  constructor(private http: HttpClient) {}
  cities: City[];
  city: City;
  carriers: Carrier[];
  universities: University[];
  countries: Country[];
  salaries: Salary[];
  getCities3() {
    return this.http.get<City[]>(this.baseUrl, { observe: 'response'}).pipe(map((response: any) => {
      this.cities = response.body;
      return this.cities;
    }));
  }
  getCities2() {
    return this.http.get<City[]>(this.baseUrl, { observe: 'response'});
  }
  getCitiesName(): Observable<string[]> {
    return this.http.get<City[]>(this.baseUrl + "/getCities", { observe: 'response'}).pipe(map((response: any) => {
      this.cities = response.body;
      return this.cities.map( x => x.cityName);
    }));
  }
  protected searchData2: AutoComplete[] = [];
  getCitiesAutoComplete(): Observable<AutoComplete[]> {
    return this.http.get<AutoComplete[]>(this.baseUrl + "/getCities", { observe: 'response'}).pipe(map((response: any) => {
      this.cities = response.body;
      for (let entry of this.cities) {
        let data: AutoComplete = {name: entry.cityName, id: entry.id}
        this.searchData2.push(data);
      }
      return this.searchData2;
    }));
  }
  getCity(key) {
    let params = new HttpParams();
    params = params.append('key', key);
    return this.http.get<City>(this.baseUrl + "/getCity", { observe: 'response', params}).pipe(map((response: any) => {
      this.city = response.body;
      return this.city;
    }));
  }
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.baseUrl + "/getCities", { observe: 'response'}).pipe(map((response: any) => {
      this.cities = response.body;
      return this.cities;
    }));
  }
  filteredCities(name): Observable<City[]> {
    let params = new HttpParams();
    params = params.append('key', name);
    return this.http.get<City[]>(this.baseUrl + "/filteredCities", { observe: 'response', params})
      .pipe(map((response: any) => {
      this.cities = response.body;
      return this.cities;
    }));
  }
  getCarriers(): Observable<Carrier[]> {
    return this.http.get<Carrier[]>(this.baseUrl + "/getCarriers", { observe: 'response'}).pipe(map((response: any) => {
      this.carriers = response.body;
      return this.carriers;
    }));
  }

  getUniversities(): Observable<University[]> {
    return this.http.get<University[]>(this.baseUrl + "/getUniversities", { observe: 'response'}).pipe(map((response: any) => {
      this.universities = response.body;
      return this.universities;
    }));
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.baseUrl + "/getCountries", { observe: 'response'}).pipe(map((response: any) => {
      this.countries = response.body;
      return this.countries;
    }));
  }

  getSalaries(): Observable<Salary[]> {
    return this.http.get<Salary[]>(this.baseUrl + "/getSalaries", { observe: 'response'}).pipe(map((response: any) => {
      this.salaries = response.body;
      return this.salaries;
    }));
  }
}
