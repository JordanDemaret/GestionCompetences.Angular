import { Component, inject, OnInit, signal } from '@angular/core';
import { CompetenceService } from '../../../core/services/competence.service';
import { CompetenceModel } from '../../../core/models/competence.model';
import { DatePipe } from '@angular/common';
import { StatutPipe } from '../../../shared/pipes/statut-pipe';
import { VisibilitePipe } from '../../../shared/pipes/visibilite-pipe';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AjouterCompetence } from './ajouter-competence/ajouter-competence';
import { CategorieModel } from '../../../core/models/categorie.model';
import { NiveauModel } from '../../../core/models/niveaux.model';
import { CategoriesService } from '../../../core/services/categories.service';
import { NiveauService } from '../../../core/services/niveau.service';
import { ModdifierCompetence } from './moddifier-competence/moddifier-competence';

@Component({
  imports: [ButtonModule, DatePipe, StatutPipe, VisibilitePipe, DialogModule, AjouterCompetence, ModdifierCompetence],
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
  moddif = false
  supprimerCompetence : boolean = false

  competenceSelect = signal<CompetenceModel|null>(null)
  
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

  ouvrirNote(note : string|null){
    if (note)
    {
      this.selectedNote = note
      this.displayNoteDialog =true
    }
  }

  ouvrirAjout () : void {
    this.ajouterCompetence = true;
  }

  ouvrirModification (c : CompetenceModel) : void{
    this.moddif = true; 
    this.competenceSelect.set(c)
  }
  
  ouvrirSuppression (c : CompetenceModel) : void{
    this.supprimerCompetence = true; 
    this.competenceSelect.set(c)
  }

  postCompetence(competence : CompetenceModel) {
    this.competenceServ.postCompetence(competence).subscribe({
      next: (comp : CompetenceModel) => {
        this.competenceList.update(competences => [...competences, comp]);
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

  PutCompetence(competence : CompetenceModel) {
    this.competenceServ.putCompetence(competence).subscribe({
      next: () => {
        this.competenceList.update(liste => liste.map(c => c.id === competence.id? competence : c ) );
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement en BDD :', err);
      },
      complete: () => {
        this.moddif = false;
      }
    })
  }

  DeleteCompetence(){
    const currentSelected = this.competenceSelect();
    if (!currentSelected) return;

    this.competenceServ.deleteCompetence(currentSelected.id).subscribe({
      next : () => {
        const pos = currentSelected.position
        this.competenceList.update(liste => liste.filter(c => c.id !== currentSelected.id)
                                      .map(c => c.position > pos? {...c, position : c.position-1} :c ))
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement en BDD :', err);
      },
      complete : () => {
        this.supprimerCompetence = false; 
        this.competenceSelect.set(null)
      }
    })
  }

}
