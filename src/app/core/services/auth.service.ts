import { computed, inject, Service, signal } from '@angular/core';
import { ConnexionRequete, InscriptionRequete, TokenInfo, UtilisateurInfo } from '../models/auth.model';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const STORAGE_KEY = 'competence.tokens';

@Service()
export class AuthService {
    
    private readonly http = inject(HttpClient);
    private readonly UrlBase = environment.apiUrl + '/auth';
    
    private readonly tokens = signal<UtilisateurInfo | null>(readFromStorage());

    readonly isLogin = computed(() => this.tokens() !== null);
    readonly accessToken = computed(() => this.tokens()?.token ?? null);

    Inscription (requete : InscriptionRequete) : Observable<unknown> {
        return this.http.post(this.UrlBase, requete);
    }

    Connexion  (request :  ConnexionRequete) : Observable<UtilisateurInfo> {
        return this.http.post<UtilisateurInfo>(`${this.UrlBase}/login`, request)
                    .pipe(tap((token : UtilisateurInfo) => {
                        this.tokens.set(token)
                        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(token))
                    }));

    }

    RefreshToken () : Observable<TokenInfo> {
        return this.http.post<TokenInfo>(`${this.UrlBase}/refresh`, 
                                        { refreshToken: this.tokens()?.refreshToken,token :this.tokens()?.token })
                    .pipe(tap((PairToken : TokenInfo) => {
                        const currentTokens = this.tokens();
                        if (currentTokens) {
                            const updatedTokens = {
                                ...currentTokens,
                                token: PairToken.token,
                                refreshToken: PairToken.refreshToken,
                            };
                            this.tokens.set(updatedTokens);
                            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTokens));
                        }
                    }))

    }

    Deconnexion  () :void {
        this.tokens.set(null);
        sessionStorage.removeItem(STORAGE_KEY);
        console.log("deco")
    }

    get Nom(){
        return this.tokens()?.nom
    }


    get Prenom(){
        return this.tokens()?.prenom
    }


}

function readFromStorage(): UtilisateurInfo | null {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) as UtilisateurInfo : null;
}

