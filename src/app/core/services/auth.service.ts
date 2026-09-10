import { computed, inject, Service, signal } from '@angular/core';
import { AccessToken, ConnexionRequete, InscriptionRequete } from '../models/auth.model';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const STORAGE_KEY = 'competence.tokens';

@Service()
export class AuthService {
    
    private readonly http = inject(HttpClient);
    private readonly UrlBase = environment.apiUrl + '/auth';
    
    private readonly tokens = signal<AccessToken | null>(readFromStorage());

    readonly isLogin = computed(() => this.tokens() !== null)

    Inscription (requete : InscriptionRequete) : Observable<unknown> {
        return this.http.post(this.UrlBase, requete);
    }

    Connexion  (request :  ConnexionRequete) : Observable<AccessToken> {
        return this.http.post<AccessToken>(`${this.UrlBase}/login`, request)
                    .pipe(tap((token : AccessToken) => {
                        this.tokens.set(token)
                        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(token))
                    }));

    }

    Deconnexion  () :void {
        this.tokens.set(null);
        sessionStorage.removeItem(STORAGE_KEY);
        console.log("deco")
    }



}
function readFromStorage(): AccessToken | null {
  // Récupérer l'élément dans le storage
  const raw = sessionStorage.getItem(STORAGE_KEY);

  return raw ? JSON.parse(raw) as AccessToken : null;
}

