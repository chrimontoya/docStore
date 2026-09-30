import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const tokenGuard: CanActivateFn = (_route, state) => {
  const router = inject(Router);
  const accessToken = sessionStorage.getItem('accessToken');

  if (accessToken) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: {
      returnUrl: state.url,
    },
  });
};
