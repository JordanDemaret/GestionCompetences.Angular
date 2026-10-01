import { Component, inject, OnInit, signal } from '@angular/core';
import { CompetenceService } from '../../../core/services/competence.service';
import { CompetenceModel } from '../../../core/models/competence.model';
import { DatePipe } from '@angular/common';
import { StatutPipe } from '../../../shared/pipes/statut-pipe';
import { VisibilitePipe } from '../../../shared/pipes/visibilite-pipe';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AjouterCompetence } from './ajouter-competence/ajouter-competence';
import { Categorie } from '../categorie/categorie';
import { CategorieModel } from '../../../core/models/categorie.model';
import { NiveauModel } from '../../../core/models/niveaux.model';
import { CategoriesService } from '../../../core/services/categories.service';
import { NiveauService } from '../../../core/services/niveau.service';

@Component({
  imports: [ButtonModule, DatePipe, StatutPipe, VisibilitePipe, DialogModule, AjouterCompetence],
  selector: 'app-competence-liste',
  styleUrl: './competence-liste.css',
  templateUrl: './competence-liste.html',
})
export class CompetenceListe implements OnInit{

  readonly competenceServ = inject(CompetenceService)
  readonly categorieServ = inject(CategoriesService)
  readonly niveauServ = inject(NiveauService)

  public competenceList = signal<CompetenceModel[]>([])
  public categorieList = signal<CategorieModel[]>([]) 
  public niveauList = signal<NiveauModel[]>([])

  displayNoteDialog: boolean = false;
  selectedNote: string = '';

  ajouterCompetence : boolean = false
  
  ngOnInit(): void {
    this.competenceServ.getAllCompetence().subscribe({
      next : (competences : CompetenceModel[]) => {
        this.competenceList.set(competences)
      } 
    })
    this.categorieServ.getAllCategorie().subscribe({
      next : (categorie : CategorieModel[]) => {
        this.categorieList.set(categorie)
      }
    })
    this.niveauServ.getAllNiveau().subscribe({
      next : (niveau : NiveauModel[]) => {
        this.niveauList.set(niveau)
      }
    })
  }

  ouvriNote(note : string|null){
    if (note)
    {
      this.selectedNote = note
      this.displayNoteDialog =true
    }
  }

  addCompetence () : void {
    this.ajouterCompetence = true;
  }

  postCompetence(competence : CompetenceModel) {
    this.competenceServ.PostCompetence(competence).subscribe({
      next: () => {
        this.competenceList.update(competences => [...competences, competence]);
        this.ajouterCompetence = false;
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement en BDD :', err);
      },
      complete: () => {
        this.ajouterCompetence = false;
      }
    })
  }

}
