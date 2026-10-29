import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const rolesGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).Role?.toLocaleLowerCase() === "admin"
        ?  true 
        : inject(Router).createUrlTree(['accueil']);
};
