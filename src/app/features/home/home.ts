import { Component, inject } from '@angular/core';
import { AjaxTimeoutError } from 'rxjs/ajax';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from "@angular/router";

@Component({
  imports: [RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

  readonly authServ = inject(AuthService)

}
