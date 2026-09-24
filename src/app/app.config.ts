import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/intercepteur/token-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme : {
        preset : Aura
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
       withInterceptors([tokenInterceptor]))
  ]
};
