import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from 'rxjs/internal/Observable';
import { DropDown, AutoComplete } from '../_models/dropDown';
import { CityService } from '../_services/city.service';
import { City } from '../_models/city';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Carrier } from '../_models/carrier';
import { University } from '../_models/university';
import { Salary } from '../_models/salary';
import { User, WholeUserData } from '../_models/user';
import { Employee } from '../_models/employee';
import { Router } from '@angular/router';
import { Employer } from '../_models/employer';
import { CompleterData, CompleterService, RemoteData } from 'ng2-completer';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private cityService: CityService, private authService: AuthService,
    private alertify: AlertifyService, private router: Router, private completerService: CompleterService ) {
      this.cityService.getCitiesAutoComplete().subscribe((city: AutoComplete[]) => {
        this.searchData2 = city
      }, (error) => {
        console.log(error);
      });
    }

  userTypeArr : DropDown[] = [{id: 1, name:'Employee'}, {id: 2, name: 'Employer'}];
  genders = ['male', 'female'];
  forbiddenUsernames = ['Chris', 'Ana'];
  signupForm: FormGroup;
  cities : City[];city : City;
  carriers : Carrier[];
  universities: University[];
  salaries: Salary[];
  bsConfig: Partial<BsDatepickerConfig>;
  wholeUserData: WholeUserData;
  employee: Employee;
  employer: Employer;
  protected searchStr: string;
  protected captain: string;
  protected dataService: CompleterData;
  protected searchData2: AutoComplete[];
  userId: any;
  blnSave: boolean = false;
  ngOnInit() {
    // this.cityService.getCities().subscribe((city: City[]) => {
    //   this.cities = city
    // });
    // this.cityService.filteredCities('sh').subscribe((city: City[]) => {
    //   this.cities = city
    //   console.log(this.cities);
    // });
      // this.cityService.getCities().subscribe((city: City[]) => {
      //   this.cities = city
      // });
      this.cityService.getCarriers().subscribe((carrier: Carrier[]) => {
        this.carriers = carrier
      });
      this.cityService.getUniversities().subscribe((university: University[]) => {
        this.universities = university
      });
      this.cityService.getSalaries().subscribe((salary: Salary[]) => {
        this.salaries = salary
      });
    this.createRegisterForm();
    this.bsConfig = {
      containerClass: 'theme-red'
    };
    setTimeout(() => {
      //this.dataService = this.completerService.local(this.searchData2, 'name', 'name');
      this.dataService = this.completerService.remote('http://localhost:5000/api/entity/filteredCities?key=');
      console.log('data source assigned');
    }, 1200);
  }
  createRegisterForm() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],//, this.forbiddenNames.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      fullName: ['', Validators.required],
      website: [''],
      age: ['', Validators.required],
      lastActive: [null],
      cv: ['', Validators.required],
      moreInfo: [''],
      section: [''],
      cityId: ['', Validators.required],
      userType: ['', Validators.required],
      carrierId: ['',Validators.required],
      salaryId: ['',Validators.required],
      universityId: ['',Validators.required],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],//, this.forbiddenEmails],
      phone: ['', Validators.required],
      universityInfo:[""]
    }, {validator: this.passwordMatchValidator});
  }

  register() {
    if (this.signupForm.valid) {
      this.signupForm.patchValue({
        'cityId': this.city.id,
      });
      this.wholeUserData = Object.assign({}, this.signupForm.value);
      this.authService.register(this.wholeUserData).subscribe(res => {
        this.userId = this.authService.userId;
        this.blnSave = true;
        this.alertify.success('Registration successful');
      }, error => {
        console.log(error)
      }
      ,() => {
        // this.authService.login(this.wholeUserData).subscribe(() => {
        //   this.router.navigate(['/page']);
        //});
      }
      );

    }
    //this.signupForm.reset();
  }
  leaveCityBox() {
    var cityName = this.signupForm.get('cityId').value;
    this.cityService.getCity(cityName).subscribe((city: City) => {
      this.city = city
    });
  }
  cancel() {

  }
  forbiddenNames(control: FormGroup): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }
}
