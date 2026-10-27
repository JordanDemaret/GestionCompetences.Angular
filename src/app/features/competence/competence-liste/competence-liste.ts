import { afterNextRender, Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CompetenceService } from '../../../core/services/competence.service';
import { CompetenceModel, StatutEnum, VisibiliteEnum } from '../../../core/models/competence.model';
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
import { CertificatServices } from '../../../core/services/certificat.services';
import { CertificatModel } from '../../../core/models/certificat.model';
import { FormsModule } from '@angular/forms';
import { FilterCompetence } from './filter-competence/filter-competence';
import {CdkDrag,CdkDragDrop,CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  imports: [ButtonModule, DatePipe, StatutPipe, VisibilitePipe, DialogModule, AjouterCompetence,
    ModdifierCompetence, FormsModule, FilterCompetence, CdkDropList, CdkDrag],
  selector: 'app-competence-liste',
  styleUrl: './competence-liste.css',
  templateUrl: './competence-liste.html',
})
export class CompetenceListe implements OnInit{
  
  readonly competenceServ = inject(CompetenceService)
  readonly categorieServ = inject(CategoriesService)
  readonly niveauServ = inject(NiveauService)
  readonly certificatServ = inject(CertificatServices)

  public competenceList = signal<CompetenceModel[]>([])
  public categorieList = signal<CategorieModel[]>([]) 
  public niveauList = signal<NiveauModel[]>([])
  public certificatListe = signal<CertificatModel[]>([])

  displayNoteDialog: boolean = false;
  selectedNote: string = '';

  ajouterCompetence : boolean = false
  moddif = false
  supprimerCompetence : boolean = false

  competenceSelect = signal<CompetenceModel|null>(null)

  searchTermNam = signal<string>('');
  searchVisisbiliter = signal<VisibiliteEnum| null>(null)
  searchStatut = signal<StatutEnum| null>(null)

  filteredCompetences = signal<CompetenceModel[]>([]);
  isFiltered = signal<boolean>(false);

  hasChanged =signal<boolean>(false);
  
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
    this.certificatServ.getAllCertificats().subscribe({
      next : (certificat : CertificatModel[])  => {
        this.certificatListe.set(certificat)
      }
    })
  }

  loadCompetences(): void {
    const str =  this.competenceList().map(c => c.id)
    this.competenceServ.putRepositionner(str).subscribe({
      error: (err) => {
        console.error('Erreur lors du réordonnancement', err);
      },
      complete : () => {
        this.hasChanged.set(false);
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

  drop(event : CdkDragDrop<CompetenceModel[]>) {

    const currentList = [...this.competenceList()];
    moveItemInArray(currentList, event.previousIndex, event.currentIndex);

    currentList.forEach((comp, index) => {
      comp.position = index + 1; 
    });
      
    this.competenceList.set(currentList);
    this.hasChanged.set(true)
  }

}
