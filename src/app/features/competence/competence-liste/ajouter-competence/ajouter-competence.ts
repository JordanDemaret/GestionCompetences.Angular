import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { CompetenceModel, StatutEnum, VisibiliteEnum } from '../../../../core/models/competence.model';
import { CategorieModel } from '../../../../core/models/categorie.model';
import { NiveauModel } from '../../../../core/models/niveaux.model';
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [ReactiveFormsModule, FormsModule, InputText, DatePicker, Select, ButtonModule],
  selector: 'app-ajouter-competence',
  styleUrl: './ajouter-competence.css',
  templateUrl: './ajouter-competence.html',
})
export class AjouterCompetence {

  categorieList = input<CategorieModel[]>([]) 
  niveauList = input<NiveauModel[]>([])

  visibiliteOption = [
    { value: VisibiliteEnum.Prive, label: "Privé"},
    { value:  VisibiliteEnum.Public, label : "Public"}
  ]
  statutOptions = [
    { value: StatutEnum.AAcquerir, label: 'À acquérir' },
    { value: StatutEnum.EnCours, label: 'En cours' },
    { value: StatutEnum.Acquise, label: 'Acquis' }
  ];

  sauvegarder = output<CompetenceModel>();
  annuler =  output()

  readonly form = inject(FormBuilder).group({
    nom : ["", [Validators.required, Validators.maxLength(200)]],
    note : ["" , [Validators.maxLength(400)]],
    dateDeDebut : ["", [Validators.required]],
    visibilite: [VisibiliteEnum.Public,[Validators.required]],
    statut: [StatutEnum.AAcquerir,[Validators.required]],
    categorieId: [, [Validators.required]],
    niveauId : [, [Validators.required]]
  })

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const competence : CompetenceModel ={
      nom: this.form.controls["nom"].value!!,
      note : this.form.controls["note"].value ?? "",
      dateDeDebut : this.form.controls["dateDeDebut"].value!!,
      visibilite: this.form.controls["visibilite"].value!!,
      statut: this.form.controls["statut"].value!!,
      categorieId: this.form.controls["categorieId"].value!!,
      niveauId: this.form.controls["niveauId"].value!!,      

      id : "",
      categorieNom : "",
      niveauLibelle : "",
      position : 0

    };
    this.sauvegarder.emit(competence);
  }



  onCancel(): void {
    this.annuler.emit();
  }

}
