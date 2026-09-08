import { Component} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  imports: [MenubarModule],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {

  item : MenuItem[] = [
     {
      label : "Inscription",
      routerLink : '/inscription'
    },
    {
      label : "Connection",
      routerLink : '/connection'
    }
  ]
}
