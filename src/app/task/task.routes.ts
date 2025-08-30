import {Routes} from '@angular/router';
import {authGuard} from '../auth/guard/auth.guard';

export const taskRoutes: Routes = [
  {
    path: 'tasks',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./task-list/task-list.component').then(m => m.TaskListComponent),
      },
      {
        path: 'new',
        loadComponent: () => import('./task-form/task-form.component').then(m => m.TaskFormComponent),
      },
      {
        path: ':id/edit',
        loadComponent: () => import('./task-form/task-form.component').then(m => m.TaskFormComponent),
      }
    ]
  }
]
