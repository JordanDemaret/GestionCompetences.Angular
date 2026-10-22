import { Component, inject, output } from '@angular/core';
import { FormBuilder, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { InputNumber } from 'primeng/inputnumber';
import { Button } from 'primeng/button';
import { CertificatModel } from '../../../../core/models/certificat.model';

@Component({
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, InputText, DatePicker, Button],
  selector: 'app-ajouter-cetificat',
  styleUrl: './ajouter-cetificat.css',
  templateUrl: './ajouter-cetificat.html',
})
export class AjouterCetificat {

  sauvegarder = output<CertificatModel>();
  annuler =  output()

  readonly form = inject(FormBuilder).group({
    nomCertificat : ["", [Validators.required, Validators.maxLength(150)]],
    codeCertificat : ["" , [Validators.required,Validators.maxLength(250)]],
    editeur : ["", [Validators.maxLength(200)]],
    dateObtention: [new Date(), [Validators.required]]
  })



    onSave(): void {
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
      utilisateurId : "",
      nombreDeCompetencesLiees : 0,
      id : ""
    }

    this.sauvegarder.emit(certificat)

  }

  onCancel(): void {
    this.annuler.emit();
  }

}
