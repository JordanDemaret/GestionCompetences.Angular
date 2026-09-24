import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {CategorieModel } from '../models/categorie.model';

@Service()
export class CategoriesService {

    private readonly http = inject(HttpClient)
    private readonly UrlBase = environment.apiUrl + '/competence'

    getAllCategorie () : Observable<CategorieModel[]> {
        return this.http.get<CategorieModel[]>(this.UrlBase)
    }
}
