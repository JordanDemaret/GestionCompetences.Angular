import { Component, inject, OnInit, signal } from '@angular/core';
import { CompetenceService } from '../../../core/services/competence.service';
import { CompetenceModel } from '../../../core/models/competence.model';
import { DatePipe } from '@angular/common';
import { StatutPipe } from '../../../shared/pipes/statut-pipe';
import { VisibilitePipe } from '../../../shared/pipes/visibilite-pipe';

@Component({
  imports: [DatePipe, StatutPipe, VisibilitePipe],
  selector: 'app-competence-liste',
  styleUrl: './competence-liste.css',
  templateUrl: './competence-liste.html',
})
export class CompetenceListe implements OnInit{

  readonly competenceServ = inject(CompetenceService)

  public competenceList = signal<CompetenceModel[]>([])
  
  ngOnInit(): void {
    this.competenceServ.getAllCompetence().subscribe({
      next : (competences : CompetenceModel[]) => {
        this.competenceList.set(competences)
      } 
    })
  }

}
