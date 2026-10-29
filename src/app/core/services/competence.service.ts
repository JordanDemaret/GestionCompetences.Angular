import { inject, Service, signal } from '@angular/core';
import { CompetenceModel, StatutEnum, VisibiliteEnum } from '../models/competence.model';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Service()
export class CompetenceService {

  private readonly http = inject(HttpClient)
  private readonly UrlBase = environment.apiUrl + "/competence"


  getAllCompetence() : Observable<CompetenceModel[]> {
    return this.http.get<CompetenceModel[]>(this.UrlBase);
  }

  postCompetence(newCompetence : CompetenceModel) : Observable<CompetenceModel> {
    return this.http.post<CompetenceModel>(this.UrlBase, newCompetence)
  }

  putCompetence(moddifComposant : CompetenceModel) : Observable<unknown>{
    return this.http.put(this.UrlBase, moddifComposant)
  }

  deleteCompetence(id : string) : Observable<unknown>{
    return this.http.delete(`${this.UrlBase}/${id}`)
  }

  putRepositionner(idCompetences : string[]) : Observable<unknown>{
    const payload = { idCompetences };
    return this.http.put(`${this.UrlBase}/repositionner`, payload);
  }
}