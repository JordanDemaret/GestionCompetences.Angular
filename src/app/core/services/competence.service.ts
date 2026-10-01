import { inject, Service, signal } from '@angular/core';
import { CompetenceModel, StatutEnum, VisibiliteEnum } from '../models/competence.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

@Service()
export class CompetenceService {

  private readonly http = inject(HttpClient)
  private readonly UrlBase = environment.apiUrl + "/competence"

  private readonly auth = inject(AuthService)

  
  getAllCompetence () : Observable<CompetenceModel[]> {
    return this.http.get<CompetenceModel[]>(`${this.UrlBase}/${this.auth.Id}`);
  }
}
