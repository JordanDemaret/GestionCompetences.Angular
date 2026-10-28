import { Component, inject, OnInit, signal } from '@angular/core';
import { CompetenceModel } from '../../../core/models/competence.model';
import { CompetenceService } from '../../../core/services/competence.service';
import { ChartModule } from 'primeng/chart'; // Importer ChartModule de PrimeNG
import { NiveauModel } from '../../../core/models/niveaux.model';
import { NiveauService } from '../../../core/services/niveau.service';

@Component({
  imports: [ChartModule],
  selector: 'app-stat',
  styleUrl: './stat.css',
  templateUrl: './stat.html',
})
export class Stat implements OnInit{

  readonly competenceServ = inject(CompetenceService);
  readonly niveauServ = inject(NiveauService);

  public competenceList = signal<CompetenceModel[]>([])
  public nivListe = signal<string[]>([])
  data : any

  ngOnInit(): void {
    this.competenceServ.getAllCompetence().subscribe({
      next : (competences : CompetenceModel[]) => {
        this.competenceList.set(competences)
      } 
    });
     this.niveauServ.getAllNiveau().subscribe({
      next : (niveau : NiveauModel[]) => {
        this.nivListe.set(niveau.map(n => n.label))
      }
    })
    
    this.data = {
      labels : this.nivListe(),
      datasets: [
        {
          data: this.nivListe().map(n => this.competenceList().filter(c=> c.niveauLibelle = n).length)
        }
      ]
    };
  }
}
