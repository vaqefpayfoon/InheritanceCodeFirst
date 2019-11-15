import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './nav/nav.component';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule,
   ButtonsModule } from 'ngx-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from 'time-ago-pipe';
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { PageComponent } from './page/page.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { MessagesComponent } from './messages/messages.component';
import { RegisterComponent } from './register/register.component';
import { PageResolver } from './_resolvers/page.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { CityService } from './_services/city.service';
import { UsersComponent } from './users/users.component';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { Ng2CompleterModule } from "ng2-completer";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotoManageComponent } from './photo-manage/photo-manage.component';
import { AllusersComponent } from './users/allusers/allusers.component';
import { AllUsersResolver } from './_resolvers/allUsers.resolver';

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TimeAgoPipe,
    HomeComponent,
    PageComponent,
    OpportunityComponent,
    MessagesComponent,
    RegisterComponent,
    UsersComponent,
    AutoCompleteComponent,
    PhotoManageComponent,
    AllusersComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(), BrowserAnimationsModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    NgxGalleryModule, NgxDatatableModule, Ng2CompleterModule,
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    })
  ],
  providers: [
    AuthService, AlertifyService, PageResolver, MessagesResolver, CityService, AllUsersResolver
    ],
  bootstrap: [AppComponent]
})
export class AppModule {}
