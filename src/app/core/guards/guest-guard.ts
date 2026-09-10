import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
   return inject(AuthService).isLogin() 
          ? inject(Router).navigate(['accueil'])
          : true
};
