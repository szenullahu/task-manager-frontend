import {Routes} from '@angular/router';
import {authGuard} from '../auth/guard/auth.guard';

export const userRoutes: Routes = [
  {
    path: 'me',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./me/me.component').then(m => m.MeComponent)
      },
      {
        path: 'edit', loadComponent: () =>
          import('./user-edit/user-edit.component').then(m => m.UserEditComponent)
      }, {
        path: 'password',
        loadComponent: () => import('./change-password/change-password.component').then(m => m.ChangePasswordComponent)
      }
    ]

  }
];
