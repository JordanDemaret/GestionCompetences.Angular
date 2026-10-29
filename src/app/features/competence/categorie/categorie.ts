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
  imports: [TableModule, ButtonModule, DialogModule, CategorieAjouter, CategorieModifier],
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

  addCategorie () : void {
    this.veuxAjouter = true;
  }

  modifCategorie (categorie : CategorieModel) : void {
    this.categorieCible = categorie;
    this.veuxModifier = true;
  }

  postNouveauCategorie (nouvelleCat: { nom: string }) : void {
    this.categorieServ.postCategorie(nouvelleCat.nom).subscribe({
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

  putNouveauCategorie (Cat: CategorieModel) : void {
    this.categorieServ.putCategorie(Cat).subscribe({
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
