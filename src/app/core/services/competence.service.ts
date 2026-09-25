import { Service, signal } from '@angular/core';
import { CompetenceModel, StatutEnum, VisibiliteEnum } from '../models/competence.model';
import { Observable, of } from 'rxjs';

@Service()
export class CompetenceService {

    private mockCompetences : CompetenceModel[] =[
    {
      id: 'a3bb189e-8bf9-3888-aa82-777777777777',
      nom: 'Angular',
      visibilite: VisibiliteEnum.Public,
      note: 'En cours de perfectionnement sur les Signals',
      dateDeDebut: new Date('2026-01-15'),
      statut: StatutEnum.EnCours,
      categorieId: 'f0a580cc-f9bd-4a2d-a4a4-000000000000',
      categorie:  "Front-end",
      niveauId: '55555555-5555-5555-5555-555555555555',
      niveau: 'Débutant'
    },{
      id: 'a3bb189e-8bf9-3888-aa82-777777777788',
      nom: 'Java les fondamental',
      visibilite: VisibiliteEnum.Prive,
      note: 'Aquit : variable/methode/block condition/boucle/ récursif/ objetc /exception/test unitaire/ Aquit : variable/methode/block condition/boucle/ récursif/ objetc /exception/test unitaire/ Aquit : variable/methode/block condition/boucle/ récursif/ objetc /exception/test unitaire/ Aquit : variable/methode/block condition/boucle/ récursif/ objetc /exception/test unitaire/ Aquit : variable/methode/block condition/boucle/ récursif/ objetc /exception/test unitaire/ Aquit : variable/methode/block condition/boucle/ récursif/ objetc /exception/test unitaire/ Aquit : variable/methode/block condition/boucle/ récursif/ objetc /exception/test unitaire/ ',
      dateDeDebut: new Date('2026-01-15'),
      statut: StatutEnum.EnCours,
      categorieId: 'f0a580cc-f9bd-4a2d-a4a4-000000000011',
      categorie:  "Java",
      niveauId: '55555555-5555-5555-5555-555555555555',
      niveau: 'Débutant'
    },{
      id: 'a3bb189e-8bf9-3888-aa82-777777777799',
      nom: ' PrimeNG',
      visibilite: VisibiliteEnum.Public,
      note: 'En cours de perfectionnement sur les Signals',
      dateDeDebut: new Date('2026-01-15'),
      statut: StatutEnum.Acquise,
      categorieId: 'f0a580cc-f9bd-4a2d-a4a4-000000000000',
      categorie:  "Front-end",
      niveauId: '55555555-5555-5555-5555-555555555555',
      niveau: 'Débutant'
    },
  ];

    private competences = signal<CompetenceModel[]>(this.mockCompetences);

    getAllCompetence () : Observable<CompetenceModel[]> {
        return of(this.competences());
    }
}
