import { Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadComponent: ()=> import('./features/auth/pages/login-component/login-component') },
];
export default routes
