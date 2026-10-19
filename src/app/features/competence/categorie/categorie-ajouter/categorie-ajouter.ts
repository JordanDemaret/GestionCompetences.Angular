import { Component, EventEmitter, inject, input, output, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Categorie } from '../categorie';
import { CategorieModel } from '../../../../core/models/categorie.model';

@Component({
  imports: [InputText, ReactiveFormsModule, Button],
  selector: 'app-categorie-ajouter',
  styleUrl: './categorie-ajouter.css',
  templateUrl: './categorie-ajouter.html',
})
export class CategorieAjouter {
  
  categoriesExistantes = input<CategorieModel[]>([])

  sauvegarder = output<{ nom: string }>();
  annuler =  output()


  readonly form : FormGroup = inject(FormBuilder).group({
    Nom : ["", [Validators.required, Validators.maxLength(150)]]
  })

  

  onSave(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const nomSaisi = this.form.value.Nom

    
    const existeDeja = this.categoriesExistantes().some(
      cat => cat.nom.toLowerCase() === nomSaisi.toLowerCase()
    );

    if (existeDeja) {
      this.form.get('Nom')?.setErrors({ doublon: true });
      return;
    }

    this.sauvegarder.emit({ nom: nomSaisi });
  }

  onCancel(): void {
    this.annuler.emit();
  }
}
