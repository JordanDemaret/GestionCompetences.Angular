import { Component, inject } from '@angular/core';
import { AjaxTimeoutError } from 'rxjs/ajax';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from "@angular/router";
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [RouterLink, ButtonModule],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

  readonly authServ = inject(AuthService)

}
