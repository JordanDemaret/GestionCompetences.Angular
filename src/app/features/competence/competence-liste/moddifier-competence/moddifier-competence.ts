import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { CompetenceModel, StatutEnum, VisibiliteEnum } from '../../../../core/models/competence.model';
import { CategorieModel } from '../../../../core/models/categorie.model';
import { NiveauModel } from '../../../../core/models/niveaux.model';
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [ReactiveFormsModule, FormsModule, InputText, DatePicker, Select, ButtonModule],
  selector: 'app-moddifier-competence',
  styleUrl: './moddifier-competence.css',
  templateUrl: './moddifier-competence.html',
})
export class ModdifierCompetence {
  categorieList = input<CategorieModel[]>([]);
  niveauList = input<NiveauModel[]>([]);
  competence = input.required<CompetenceModel>();

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
    dateDeDebut : [new Date(), [Validators.required]],
    visibilite: [VisibiliteEnum.Public,[Validators.required]],
    statut: [StatutEnum.AAcquerir,[Validators.required]],
    categorieId: ["", [Validators.required]],
    niveauId : ["", [Validators.required]]
  })

  constructor(){
    effect(() => {
      if(this.competence() !== null) {
        this.form.patchValue({
          nom : this.competence()!.nom,
          note : this.competence()!.note,
          dateDeDebut :new Date(this.competence()!.dateDeDebut),
          visibilite : this.competence()!.visibilite,
          statut : this.competence()!.statut,
          categorieId : this.competence()!.categorieId,
          niveauId : this.competence()!.niveauId,
        })
      }
    })
  }
  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const dateSelectionnee = new Date(this.form.controls["dateDeDebut"].value!);
    dateSelectionnee.setHours(12, 0, 0, 0);

    const competence : CompetenceModel ={
      id : this.competence()!.id,
      nom: this.form.controls["nom"].value!,
      note : this.form.controls["note"].value ?? "",
      dateDeDebut :dateSelectionnee,
      visibilite: this.form.controls["visibilite"].value!,
      statut: this.form.controls["statut"].value!,
      categorieId: this.form.controls["categorieId"].value!,
      niveauId: this.form.controls["niveauId"].value!,      
      categorieNom : this.categorieList().find(c => c.id == this.form.controls["categorieId"].value!)?.nom ?? "",
      niveauLibelle : this.niveauList().find(c => c.id == this.form.controls["niveauId"].value!)?.label ?? "",
      position : this.competence()!.position,

      certificatNom : null,
      certificatId : ""

    };
    this.sauvegarder.emit(competence);
  }



  onCancel(): void {
    this.annuler.emit();
  }

}

