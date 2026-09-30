import {Routes} from '@angular/router';
import {tokenGuard} from './core/guards/token-guard';
import {LibraryComponent} from './features/library/pages/library/library-component';
import {PaperComponent} from './features/library/pages/paper/paper-component';

const routes: Routes = [
  {path: 'login', loadComponent: () => import('./features/auth/pages/login/login-component')},
  {
    path: '',
    loadComponent: () => import('./layout/main/main-component'),
    canActivate: [tokenGuard],
    children: [
      {path: 'library', component: LibraryComponent},
      {path: 'paper', component: PaperComponent},
    ]
  },
];
export default routes
