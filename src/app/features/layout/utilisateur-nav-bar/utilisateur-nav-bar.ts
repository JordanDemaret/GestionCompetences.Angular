
import { Component, inject, Inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  imports: [
    PanelMenuModule,],
  selector: 'app-utilisateur-nav-bar',
  styleUrl: './utilisateur-nav-bar.css',
  templateUrl: './utilisateur-nav-bar.html',
})
export class UtilisateurNavBar implements OnInit {
  
  readonly authServ = inject(AuthService);

  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = [
      {
        label: 'Compétence',
        icon: 'pi pi-star',
        routerLink: ['/competence']
      },      
      {
        label: 'Catégories',
        icon: 'pi pi-tags',
        routerLink: ['/competence/categories']
      },
      
      
      


      {
        label: 'Certificat',
        icon: 'pi pi-graduation-cap',
        routerLink: ['/competence/certificat']
      },
      {
        label: 'stat',
        icon: 'pi pi-chart-scatter',
        routerLink: ['/competence/stat']
      },

    ];
  }

}
