import { inject, Service } from '@angular/core';
import { Inscription } from '../../features/auth/inscription/inscription';
import { InscriptionRequete } from '../models/auth.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Service()
export class AuthService {
    
    private readonly http = inject(HttpClient);
    private readonly UrlBase = environment.apiUrl + '/auth';


    Inscription (requete : InscriptionRequete) : Observable<unknown> {
        return this.http.post(this.UrlBase, requete);
    }

}
