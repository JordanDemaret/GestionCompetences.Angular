import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  
  const auth: AuthService = inject(AuthService);
  const route = inject(Router)

  const clone = auth.accessToken()
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${auth.accessToken()}`,
        },
      })
    : req;

  return next(clone).pipe(
    catchError((error : HttpErrorResponse) =>{
      if(error.status === 401){
        return auth.RefreshToken().pipe(
          switchMap (() => {
            const retryReq = req.clone({
              setHeaders: { Authorization: `Bearer ${auth.accessToken()}` }
            });
            return next(retryReq);
          }),
          catchError ( () => {
            auth.Deconnexion()
            route.navigate(['/connexion']);
            return throwError(() => error);
          })
        );      
      }
      return throwError(() => error);
    })
  );
};
