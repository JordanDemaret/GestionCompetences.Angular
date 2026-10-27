import { Component, computed, effect, input, output, signal } from '@angular/core';
import { CompetenceModel, StatutEnum, VisibiliteEnum } from '../../../../core/models/competence.model';
import { FormsModule } from '@angular/forms';
import { CategorieModel } from '../../../../core/models/categorie.model';
import { NiveauModel } from '../../../../core/models/niveaux.model';

@Component({
  imports: [FormsModule],
  selector: 'app-filter-competence',
  styleUrl: './filter-competence.css',
  templateUrl: './filter-competence.html',
})
export class FilterCompetence {
  VisibiliteEnum = VisibiliteEnum;
  StatuEnum = StatutEnum;

  competenceList = input.required<CompetenceModel[]>()
  categorieListe = input<CategorieModel[]>() 
  niveauListe = input<NiveauModel[]>() 
  filteredCompetences = output<CompetenceModel[]>()
  hasFilterChanged = output<boolean>();


  searchTermNam = signal<string>('');
  searchDateDebut = signal<string | null>(null);
  searchDateFin = signal<string | null>(null);
  searchVisisbiliter = signal<VisibiliteEnum| null>(null)
  searchStatut = signal<StatutEnum| null>(null)
  searchCategori = signal<string|null>(null)
  searchNiveau= signal<string|null>(null)

  private filteredListe = computed(() => {
    const NomCompe = this.searchTermNam().toLowerCase();

    const liste = this.competenceList().filter(c => {
      const compDate = new Date(c.dateDeDebut).toISOString().split('T')[0];
          
      return ( c.nom.toLowerCase().includes(NomCompe))
              &&
              ( this.searchVisisbiliter() === null ||
                c.visibilite === this.searchVisisbiliter()!)
              &&
              ( this.searchStatut() === null ||
                c.statut === this.searchStatut()!)
              && (
                this.searchCategori() === null ||
                c.categorieId == this.searchCategori()
              )
              && (
                this.searchNiveau() === null ||
                c.niveauId == this.searchNiveau()
              )
              &&
              (
                this.searchDateDebut() === null ||
                compDate >= this.searchDateDebut()!
              ) 
              &&
              (
                this.searchDateFin() === null ||
                compDate <= this.searchDateFin()!
              );
    });
    return liste

  });

  reset() {
    this.searchTermNam.set('');
    this.searchDateDebut.set(null);
    this.searchDateFin.set(null);
    this.searchVisisbiliter.set(null)
    this.searchStatut.set(null)
    this.searchCategori.set(null)
    this.searchNiveau.set(null)
  }

  hasActiveFilter = computed(() => {
    return this.searchTermNam() !== '' || 
          this.searchVisisbiliter() !== null || 
          this.searchStatut() !== null || 
          this.searchCategori() !== null || 
          this.searchNiveau() !== null || 
          this.searchDateDebut() !== null ||
          this.searchDateFin() !== null;
  });


  constructor() {
    effect(() => {
      const resultat = this.filteredListe();
      this.filteredCompetences.emit(resultat);
      this.hasFilterChanged.emit(this.hasActiveFilter())
    });
  }

}
