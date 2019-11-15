import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageComponent } from './page/page.component';
import { MessagesComponent } from './messages/messages.component';
import { OpportunityComponent } from './opportunity/opportunity.component';
import { PageResolver } from './_resolvers/page.resolver';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { UsersComponent } from './users/users.component';
import { AllusersComponent } from './users/allusers/allusers.component';
import { AllUsersResolver } from './_resolvers/allUsers.resolver';


export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'register', component: RegisterComponent},
    {
      path: '',
      canActivate: [AuthGuard],
      runGuardsAndResolvers: 'always',
      children: [
          {path: 'page/:id', component: PageComponent, resolve: { user: PageResolver }},
          {path: 'messages/:id', component: MessagesComponent},
          {path: 'opportunity/:id', component: OpportunityComponent},
          {path: 'allusers', component: AllusersComponent, resolve: { users: AllUsersResolver }}
      ]
  },
  {path: 'users', component: UsersComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
