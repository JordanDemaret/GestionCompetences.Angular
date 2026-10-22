import { Component, effect, inject, input, output } from '@angular/core';
import { CertificatModel } from '../../../../core/models/certificat.model';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { Button } from 'primeng/button';

@Component({
  imports: [ReactiveFormsModule, InputText, DatePicker, Button],
  selector: 'app-moddifier-cetificat',
  styleUrl: './moddifier-cetificat.css',
  templateUrl: './moddifier-cetificat.html',
})
export class ModdifierCetificat {

  certificat = input.required<CertificatModel>();

  sauvegarder = output<CertificatModel>();
  annuler =  output()

  readonly form = inject(FormBuilder).group({
    nomCertificat : ["", [Validators.required, Validators.maxLength(150)]],
    codeCertificat : ["" , [Validators.required,Validators.maxLength(250)]],
    editeur : ["", [Validators.maxLength(200)]],
    dateObtention: [new Date(), [Validators.required]]
  })

  constructor(){
    effect(() => {
      if(this.certificat() !== null){
        this.form.patchValue({
          nomCertificat: this.certificat()!.nomCertificat,
          codeCertificat : this.certificat()!.codeCertificat,
          editeur : this.certificat()?.editeur,
          dateObtention : new Date(this.certificat()!.dateObtention)
        })
      }
    })
  }

  onSave():void {
     if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const dateSelectionnee= new Date(this.form.controls["dateObtention"].value!)
    dateSelectionnee.setHours(12);
    
    const certificat : CertificatModel ={
      nomCertificat : this.form.controls["nomCertificat"].value!,
      codeCertificat: this.form.controls["codeCertificat"].value!,
      editeur : this.form.controls["editeur"].value?? "",
      dateObtention : dateSelectionnee,
      nombreDeCompetencesLiees : 0,
      id : this.certificat()!.id
    }

    this.sauvegarder.emit(certificat)
  }

  onCancel():void {
    this.annuler.emit();
  }
}
