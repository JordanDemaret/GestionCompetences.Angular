import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest-guard';
import { Connexion } from './features/auth/connexion/connexion';

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
        path : "categorie",
        loadComponent : () => import('./features/competence/categorie/categorie').then(f => f.Categorie )
    },

    {
        path : "**",
        redirectTo : "accueil"
    }

];
