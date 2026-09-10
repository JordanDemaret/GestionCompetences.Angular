import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard';

export const routes: Routes = [
    {
        path :"",
        redirectTo : 'accueil',
        pathMatch : 'full'
    },
    {
        path : "accueil",
        loadComponent : () => import('./features/home/home').then(f => f.Home)
    },
    {
        path : 'inscription',
        loadComponent : () => import('./features/auth/inscription/inscription').then(f => f.Inscription),
        canActivate : [guestGuard]
    },
    
    {
        path : 'connexion',
        loadComponent : () => import('./features/auth/connexion/connexion').then(f => f.Connexion),
        canActivate : [guestGuard]
    },

    {
        path : "**",
        redirectTo : "accueil"
    }

];
