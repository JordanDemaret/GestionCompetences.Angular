import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { CategorieModel } from '../../../core/models/categorie.model';
import { Router, RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CategorieAjouter } from './categorie-ajouter/categorie-ajouter';
import { CategorieModifier } from './categorie-modifier/categorie-modifier';

@Component({
  imports: [TableModule, ButtonModule, RouterLink, DialogModule, CategorieAjouter, CategorieModifier],
  selector: 'app-categorie',
  styleUrl: './categorie.css',
  templateUrl: './categorie.html',
})
export class Categorie implements OnInit  {

  private readonly categorieServ = inject(CategoriesService)
  private readonly route = inject(Router)

  public categorieList = signal<CategorieModel[]>([]);

  public categorieCible :CategorieModel| null = null;

  veuxAjouter : boolean = false;
  veuxModifier : boolean = false;

  ngOnInit(): void {
    this.categorieServ.getAllCategorie().subscribe({
      next : (categories : CategorieModel[]) => {
        this.categorieList.set(categories)
      },
      error : () => {
        this.route.navigate([''])
      }

    })
  }

  addCompetence () : void {
    this.veuxAjouter = true;
  }

  modifCompetence (categorie : CategorieModel) : void {
    this.categorieCible = categorie;
    this.veuxModifier = true;
  }

  postNouveauCompetence (nouvelleCat: { nom: string }) : void {
    this.categorieServ.getPostCategorie(nouvelleCat.nom).subscribe({
      next: (categorie) =>{
        this.categorieList.update(list => [...list, categorie ])
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement en BDD :', err);
      },
      complete: () => {
        this.veuxAjouter = false;
      }
    })
  }

  putNouveauCompetence (Cat: CategorieModel) : void {
    this.categorieServ.getPutCategorie(Cat).subscribe({
      next: (categorie) =>{
        this.categorieList.update(list => list.map(c => c.id === Cat.id ? { ...c, nom: Cat.nom } : c))
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement en BDD :', err);
      },
      complete: () => {
        this.categorieCible = null;
        this.veuxModifier = false;
      }
    })
  }


}
