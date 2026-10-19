import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { NiveauModel } from '../models/niveaux.model';

@Service()
export class NiveauService {

    private readonly http = inject(HttpClient);
    private readonly baseUrl =  environment.apiUrl +"/niveau"

    getAllNiveau() : Observable<NiveauModel[]>  {
        return this.http.get<NiveauModel[]>(this.baseUrl)
    } 
}
