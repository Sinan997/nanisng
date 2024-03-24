import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent) },
  { path: 'button', loadComponent: () => import('./button-intro/button-intro.component').then((m) => m.ButtonIntroComponent) },
  { path: 'input-text', loadComponent: () => import('./input-text-intro/input-text-intro.component').then((m) => m.InputTextIntroComponent) },
];
