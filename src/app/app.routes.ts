import { Routes } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {MeComponent} from './user/me/me.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'me', component: MeComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
