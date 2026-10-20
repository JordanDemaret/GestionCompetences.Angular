import { Routes } from "@angular/router";
import { rolesGuard } from "../../core/guards/roles-guard";

export const routes : Routes = [
    
    {
        path : "",
        loadComponent : () => import('./competence-liste/competence-liste').then(f => f.CompetenceListe )
    },
    {
        path : "categories",
        loadComponent : () => import('./categorie/categorie').then(f => f.Categorie ),
        canActivate : [rolesGuard]
    },
]