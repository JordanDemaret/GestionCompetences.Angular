import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path : 'inscription',
        loadComponent : () => import('./features/auth/inscription/inscription').then(f => f.Inscription)
    },
    
    {
        path : 'connection',
        loadComponent : () => import('./features/auth/connection/connection').then(f => f.Connection)
    }

];
