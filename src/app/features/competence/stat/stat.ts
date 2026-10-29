import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CompetenceModel } from '../../../core/models/competence.model';
import { CompetenceService } from '../../../core/services/competence.service';
import { ChartModule } from 'primeng/chart'; // Importer ChartModule de PrimeNG
import { NiveauModel } from '../../../core/models/niveaux.model';
import { NiveauService } from '../../../core/services/niveau.service';
import { CardModule } from 'primeng/card';
import { CategoriesService } from '../../../core/services/categories.service';
import { CategorieModel } from '../../../core/models/categorie.model';

@Component({
  imports: [ChartModule, CardModule],
  selector: 'app-stat',
  styleUrl: './stat.css',
  templateUrl: './stat.html',
  standalone : true
})
export class Stat implements OnInit{

  readonly competenceServ = inject(CompetenceService);
  readonly categorie = inject(CategoriesService);
  readonly niveauServ = inject(NiveauService);

  public competenceList = signal<CompetenceModel[]>([])
  public categorieList = signal<string[]>([])
  public nivListe = signal<string[]>([])
  
  dataCompNav = computed(() => { return {
      labels : this.nivListe(),
      datasets: [
        {
          data: this.nivListe().map(n => this.competenceList().filter(c=> c.niveauLibelle === n).length)
        }
      ]
    }});

  dataCompCat= computed(() => { 
    const categories = this.categorieList();
    const competences = this.competenceList();

    if (!categories || !competences) {
      return null;
    }

    let categoryCounts = categories.map(cat => ({
      name: cat,
      count: competences.filter(c=> c.categorieNom === cat).length // ne marche as 

    }));
    categoryCounts.sort((a, b) => b.count - a.count);
    categoryCounts = categoryCounts.filter(elem => elem.count > 0)


    let finalLabels: string[] = [];
    let finalData: number[] = [];
    
    if (categoryCounts.length > 9) {

      finalLabels = categoryCounts.slice(0, 9).map(item => item.name);
      finalData = categoryCounts.slice(9).map(item => item.count);

      const sumOthers = categoryCounts.slice(9).reduce((acc, curr) => acc + curr.count, 0);
      if (sumOthers > 0) {
        finalLabels.push('Autre');
        finalData.push(sumOthers);
      }
    } 
    else {
      finalLabels = categoryCounts.map(item => item.name);
      finalData = categoryCounts.map(item => item.count);
    }

    return {
      labels : finalLabels,
      datasets: [
        {
          data: finalData
        }
      ]
    }});




  ngOnInit(): void {
    this.competenceServ.getAllCompetence().subscribe({
      next : (competences : CompetenceModel[]) => {
        this.competenceList.set(competences)
      } 
    });
    this.categorie.getAllCategorie().subscribe({
          next : (categorie : CategorieModel[]) => {
            this.categorieList.set(categorie.map(c => c.nom))
          }
        })
    this.niveauServ.getAllNiveau().subscribe({
      next : (niveau : NiveauModel[]) => {
        this.nivListe.set(niveau.map(n => n.label))
      }
    })
  }

}
