import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ErreurModel } from '../../../core/models/erreur.models';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConnectionRequete } from '../../../core/models/auth.model';
import { Router } from '@angular/router';
import { LabelModule } from 'primeng/label';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { MotDePasseValidatorError } from '../../../shared/validators/mot-de-passe.validator';

@Component({
  imports: [LabelModule, InputTextModule, ReactiveFormsModule, ButtonDirective],
  selector: 'app-connection',
  styleUrl: './connection.css',
  templateUrl: './connection.html',
})
export class Connection {


  private readonly authService = inject(AuthService);
  private readonly route = inject(Router);

  readonly erreur = signal<ErreurModel | null>(null)


  readonly form : FormGroup = inject(FormBuilder).nonNullable.group({
    email : ["",[Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")]],
    motDePasse : [null,[Validators.required]]
  })

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

    const requete : ConnectionRequete = this.form.value


    this.authService.Connection(requete).subscribe({
      next : () => { 
        console.log("ok 1");
        this.erreur.set(null);
        this.route.navigate([''])
      },
      error  : (err ) => {
        this.erreur.set(err.error);
      }
    })
  }

}
