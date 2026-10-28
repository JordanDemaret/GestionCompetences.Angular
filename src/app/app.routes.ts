import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard';
import { Connexion } from './features/auth/connexion/connexion';
import { authGuard } from './core/guards/auth-guard';

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
        path :'competence',
        loadChildren : () => import('./features/competence/competence.routes').then( x => x.routes),
        canActivate : [authGuard]
    },
    {
        path : "**",
        redirectTo : "accueil"
    }

];
