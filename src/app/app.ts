import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './features/layout/navbar/navbar';
import { UtilisateurNavBar } from './features/layout/utilisateur-nav-bar/utilisateur-nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, UtilisateurNavBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('GestionCompetences.Angular');  
}
