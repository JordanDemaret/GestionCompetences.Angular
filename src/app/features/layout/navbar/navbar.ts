import { Component, computed, inject, Inject} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [MenubarModule],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {

  readonly authService = inject(AuthService)
  private readonly route= inject(Router) 

  item = computed<MenuItem[]>(() =>{ 

      const isLogin = this.authService.isLogin()

      console.log("modi")
      return [{
          label : "Inscription",
          routerLink : '/inscription',
          visible : !isLogin
        },
        {
          label : "Connection",
          routerLink : '/connection',
          visible : !isLogin
        },
        {
          label : "Déconnection",
          visible : isLogin,
          command : () => {
            this.authService.Deconnection();
            this.route.navigate([''])
          }
        }]
    });

}
