import { Component, computed, inject} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../../core/services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs';

@Component({
  imports: [MenubarModule],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {

  readonly authService = inject(AuthService)
  private readonly route= inject(Router) 
  
  private readonly currentUrl = toSignal(
        this.route.events.pipe(
          filter((e): e is NavigationEnd => e instanceof NavigationEnd),
          map(e => e.urlAfterRedirects)
        ),
        { initialValue: this.route.url }
      );


  item = computed<MenuItem[]>(() =>{ 

      const isLogin = this.authService.isLogin();
      const url = this.currentUrl()
      
      console.log("modi")
      return [
        {
          label : 'Accueil',
          routerLink : "/accueil",
          icon : 'pi pi-home', 
          styleClass : url === '/accueil' ? 'active-item' : ''
        },
        {
          label : "Inscription",
          routerLink : '/inscription',
          visible : !isLogin,
          icon :  "pi pi-user-plus",
          styleClass:  url === '/inscription' ? 'active-item push-right ' : 'push-right'
        },
        {
          label : "Connexion",
          routerLink : '/connexion',
          visible : !isLogin,
          icon : "pi pi-sign-in",
          styleClass :  url === '/connexion' ? 'active-item' : ''
        },
        {
          label : "Déconnexion",
          visible : isLogin,
          icon : "pi pi-sign-out",
           styleClass: 'push-right',
          command : () => {
            this.authService.Deconnexion();
            this.route.navigate([''])
          }
        }]
    });

}
