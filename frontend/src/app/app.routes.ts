import { Routes } from '@angular/router';
import {tokenGuard} from './shared/guards/token-guard';

const routes: Routes = [
  { path: 'login', loadComponent: ()=> import('./features/auth/pages/login-component/login-component') },
  {
    path: 'library',
    loadComponent: () => import('./features/library/pages/library/library'),
    canActivate: [tokenGuard],
  },
];
export default routes
