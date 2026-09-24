import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories.service';
import { CategorieModel } from '../../../core/models/categorie.model';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  imports: [TableModule],
  selector: 'app-categorie',
  styleUrl: './categorie.css',
  templateUrl: './categorie.html',
})
export class Categorie implements OnInit  {

  private readonly categorieServ = inject(CategoriesService)
  private readonly route = inject(Router)

  public categorieList = signal<CategorieModel[]>([]);

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


}
