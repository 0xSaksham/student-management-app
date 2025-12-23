import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  {
    path: 'posts',
    loadComponent: () =>
      import('./components/post-list/post-list.component').then((m) => m.PostListComponent),
  },

  {
    path: 'posts/:id',
    loadComponent: () =>
      import('./components/post-detail/post-detail.component').then((m) => m.PostDetailComponent),
  },
];
