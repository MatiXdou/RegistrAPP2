import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.estaLogueado().pipe(
    map(estaAutenticado => {
      if (estaAutenticado) {
        return true;
      } else {
        router.navigate(['/iniciar-sesion']);
        return false;
      }
    })
  );
};
