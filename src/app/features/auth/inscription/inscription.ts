import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LabelModule } from 'primeng/label';
import { MotDePasseValidator, MotDePasseValidatorError } from '../../../shared/validators/mot-de-passe.validator';
import { AuthService } from '../../../core/services/auth.service';
import { InscriptionRequete } from '../../../core/models/auth.model';
import { Router } from '@angular/router';
import { ErreurModel } from '../../../core/models/erreur.models';
import { AfficherMotDePasseDirective } from "../../../shared/directives/afficher-mot-de-passe.directive";

@Component({
  imports: [LabelModule, InputTextModule, ReactiveFormsModule, ButtonDirective, AfficherMotDePasseDirective],
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


    this.authService.Inscription(requete).subscribe({
      next : () => { 
        this.erreur.set(null);
        this.route.navigate(['connection'])

      },
      error  : (err ) => {
        this.erreur.set(err.error);
      }
    })
  }

 
}
