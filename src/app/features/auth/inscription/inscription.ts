import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LabelModule } from 'primeng/label';
import { MotDePasseValidator, MotDePasseValidatorError } from '../../../shared/validators/mot-de-passe.validator';

@Component({
  imports: [LabelModule, InputTextModule, ReactiveFormsModule, ButtonDirective],
  selector: 'app-inscription',
  styleUrl: './inscription.css',
  templateUrl: './inscription.html',
})
export class Inscription {

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
}
