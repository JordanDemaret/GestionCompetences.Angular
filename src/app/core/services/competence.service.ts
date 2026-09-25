import { Service, signal } from '@angular/core';
import { CompetenceModel, StatutEnum, VisibiliteEnum } from '../models/competence.model';
import { Observable, of } from 'rxjs';

@Service()
export class CompetenceService {

    private mockCompetences : CompetenceModel[] =[
    {
      id: 'a3bb189e-8bf9-3888-aa82-777777777777',
      nom: 'Angular 18 & PrimeNG',
      visibilite: VisibiliteEnum.Public,
      note: 'En cours de perfectionnement sur les Signals',
      dateDeDebut: new Date('2026-01-15'),
      statut: StatutEnum.EnCours,
      categorieId: 'f0a580cc-f9bd-4a2d-a4a4-000000000000',
      categorie:  "java",
      niveauId: '55555555-5555-5555-5555-555555555555',
      niveau: 'debutant'
    }
  ];

    private competences = signal<CompetenceModel[]>(this.mockCompetences);

    getAllCompetence () : Observable<CompetenceModel[]> {
        return of(this.competences());
    }
}
