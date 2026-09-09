import { inject, Service, signal } from '@angular/core';
import { Inscription } from '../../features/auth/inscription/inscription';
import { AccessToken, ConnectionRequete, InscriptionRequete } from '../models/auth.model';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const STORAGE_KEY = 'competence.tokens';

@Service()
export class AuthService {
    
    private readonly http = inject(HttpClient);
    private readonly UrlBase = environment.apiUrl + '/auth';
    
    private readonly tokens = signal<AccessToken | null>(readFromStorage());

    Inscription (requete : InscriptionRequete) : Observable<unknown> {
        return this.http.post(this.UrlBase, requete);
    }

    Connection  (request :  ConnectionRequete) : Observable<AccessToken> {
        return this.http.post<AccessToken>(`${this.UrlBase}/login`, request)
                    .pipe(tap((token : AccessToken) => {
                        this.tokens.set(token)
                        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(token))
                    }));

    }

}
function readFromStorage(): AccessToken | null {
  // Récupérer l'élément dans le storage
  const raw = sessionStorage.getItem(STORAGE_KEY);

  return raw ? JSON.parse(raw) as AccessToken : null;
}

