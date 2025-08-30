import {Routes} from '@angular/router';
import {preventLoggedInAccessGuard} from './auth/guard/prevent-logged-in-access.guard';
import {taskRoutes} from './task/task.routes';
import {userRoutes} from './user/user.routes';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent),
    canActivate: [preventLoggedInAccessGuard]
  },
  {
    path: 'register', loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent),
    canActivate: [preventLoggedInAccessGuard]
  },
  ...taskRoutes,
  ...userRoutes,
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
