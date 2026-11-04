import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CompetenceModel } from '../../../core/models/competence.model';
import { CompetenceService } from '../../../core/services/competence.service';
import { ChartModule } from 'primeng/chart';
import { NiveauModel } from '../../../core/models/niveaux.model';
import { NiveauService } from '../../../core/services/niveau.service';
import { CardModule } from 'primeng/card';
import { CategoriesService } from '../../../core/services/categories.service';
import { CategorieModel } from '../../../core/models/categorie.model';
import {ButtonModule } from 'primeng/button';


@Component({
  imports: [ChartModule, CardModule, ButtonModule],
  selector: 'app-stat',
  styleUrl: './stat.css',
  templateUrl: './stat.html'
})
export class Stat implements OnInit{

  readonly competenceServ = inject(CompetenceService);
  readonly categorie = inject(CategoriesService);
  readonly niveauServ = inject(NiveauService);

  public competenceList = signal<CompetenceModel[]>([])
  public categorieList = signal<string[]>([])
  public nivListe = signal<string[]>([])

  public vueMoisActif = signal<boolean>(true)
  
  dataCompNav = computed(() => { 
    if (this.competenceList().length ==0 || this.nivListe().length == 0) {
      return null;
    }
    return {
      labels : this.nivListe(),
      datasets: [
        {
          data: this.nivListe().map(n => this.competenceList().filter(c=> c.niveauLibelle === n).length)
        }
      ]
    }
  });

  dataCompCat= computed(() => { 
    const categories = this.categorieList();
    const competences = this.competenceList();
    const nombreElem = 5 

    if (categories.length ==0 || competences.length == 0) {
      return null;
    }

    let categoryCounts = categories.map(cat => ({
      name: cat,
      count: competences.filter(c=> c.categorieNom === cat).length 

    }));
    categoryCounts.sort((a, b) => b.count - a.count);
    categoryCounts = categoryCounts.filter(elem => elem.count > 0)


    let finalLabels: string[] = [];
    let finalData: number[] = [];
    
    if (categoryCounts.length > nombreElem) {

      finalLabels = categoryCounts.slice(0, nombreElem).map(item => item.name);
      finalData = categoryCounts.slice(0,nombreElem).map(item => item.count);

      const sumOthers = categoryCounts.slice(nombreElem).reduce((acc, curr) => acc + curr.count, 0);
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

  dataDateCompetence = computed(() => {
    if(this.vueMoisActif())
      return this.calFiltre12Mois(this.competenceList())
    else
      return this.calFiltreAns(this.competenceList());
  })

  chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0     
        }
      }
    }, 
    plugins: {
      legend: {
        onClick: (e : any) => {
          e.stopPropagation(); 
        }
      }
    }
  };

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

  private calFiltre12Mois(competences : CompetenceModel[]){
    const mnt = new Date();
    const unAns = new Date();
    unAns.setFullYear(mnt.getFullYear()-1)

    const trier = competences.filter(c => {
      const date = new Date(c.dateDeDebut);
      return date >= unAns && date <= mnt
    })

    const labels: string[] = [];
    const dataCounts: number[] = [];

    for (let index = 11; index >= 0; index--) {
      const dateCible = new Date()
      dateCible.setMonth(mnt.getMonth()-index)

      labels.push(dateCible.toLocaleString('default', { month: 'short', year: 'numeric' }));

      dataCounts.push( (trier.filter(c => {
        const date = new Date(c.dateDeDebut);
        return date.getMonth() == dateCible.getMonth() && date.getFullYear() == dateCible.getFullYear()
      })).length)
        
    } 

    return {
      labels : labels,
      datasets: [
        {
          label : "Nombre de compétence",
          data: dataCounts
        }
      ]
    }

  }

  private calFiltreAns(competences : CompetenceModel[]){
    const annees = new Set(competences.map(c => new Date(c.dateDeDebut).getFullYear()))

    const anneeSet= Array.from(annees).sort((a, b) => a - b);

    const labels: string[] = [];
    const dataCounts: number[] = [];

    anneeSet.forEach(annee => {
      labels.push(annee.toString())

      dataCounts.push((competences.filter(c => {
        const date = new Date(c.dateDeDebut);
        return date.getFullYear() == annee
      })).length)
    })



    return {
      labels : labels,
      datasets: [
        {
          label : "Nombre de compétence",
          data: dataCounts
        }
      ]
    }

  }

}
