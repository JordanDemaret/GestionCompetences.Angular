import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MotDePasseValidator, MotDePasseValidatorError } from '../../../shared/validators/mot-de-passe.validator';
import { AuthService } from '../../../core/services/auth.service';
import { InscriptionRequete } from '../../../core/models/auth.model';
import { Router, RouterLink } from '@angular/router';
import { ErreurModel } from '../../../core/models/erreur.models';
import { AfficherMotDePasseDirective } from "../../../shared/directives/afficher-mot-de-passe.directive";
import { switchMap } from 'rxjs';
import { MessageModule } from 'primeng/message';

@Component({
  imports: [InputTextModule, ReactiveFormsModule, ButtonDirective, AfficherMotDePasseDirective, RouterLink,MessageModule],
  selector: 'app-inscription',
  styleUrl: './inscription.css',
  templateUrl: './inscription.html',
})
export class Inscription {

  private readonly authService = inject(AuthService);
  private readonly route = inject(Router);

  readonly erreur = signal<ErreurModel | null>(null)


  readonly form : FormGroup = inject(FormBuilder).nonNullable.group({
    nom : ["",[Validators.required, Validators.maxLength(150)]],
    prenom : ["",[Validators.required, Validators.maxLength(150)]],
    email : ["",[Validators.required, Validators.maxLength(150), Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
    motDePasse : [null,[Validators.required, Validators.minLength(8),Validators.maxLength(150), MotDePasseValidator()]]
  })

  get Nom(){
    return this.form.controls["nom"]
  }
  
  get Prenom(){
    return this.form.controls["prenom"]
  }

  get Email(){
    return this.form.controls["email"]
  }
  get MotDePasse(){
    return this.form.controls["motDePasse"]
  }

  get MotDePasseErreur() : MotDePasseValidatorError| null{
    return this.MotDePasse.errors?.['mdpRobuste'] ?? null
  }

  onSubmit(){
    if(this.form.invalid)
      return 

    const requete : InscriptionRequete = this.form.value


    this.authService.inscription(requete).pipe(
      switchMap( () => this.authService.connexion({
          email : requete.email,
          motDePasse : requete.motDePasse
        })
    )).subscribe({
      next : () => { 
        this.erreur.set(null);
        this.route.navigate([''])
      },
      error  : (err ) => {
        this.erreur.set(err.error);
      }
    })
  }

 
}
