import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'home', component: HomeComponent },
      {
        path: 'getting-started',
        loadComponent: () =>
          import('./getting-started/getting-started.component').then(
            (m) => m.GettingStartedComponent
          ),
      },
];
