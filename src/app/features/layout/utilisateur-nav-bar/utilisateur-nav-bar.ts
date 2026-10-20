
import { Component, computed, inject } from '@angular/core';
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
export class UtilisateurNavBar {
  
  readonly authServ = inject(AuthService);

  menuItems = computed<MenuItem[]>(() => {
    const isAdmin = this.authServ.Role?.toLocaleLowerCase() === "admin";  
    return [
        {
          label: 'Compétence',
          icon: 'pi pi-star',
          routerLink: ['/competence']
        },      
        {
          label: 'Catégories',
          icon: 'pi pi-tags',
          visible: isAdmin,
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
  })

}
