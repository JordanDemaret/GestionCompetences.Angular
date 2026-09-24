import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { CategorieModel } from '../../../../core/models/categorie.model';

@Component({
  imports: [InputText, ReactiveFormsModule, Button],
  selector: 'app-categorie-modifier',
  styleUrl: './categorie-modifier.css',
  templateUrl: './categorie-modifier.html',
})
export class CategorieModifier {
  
  categoriesExistantes = input<CategorieModel[]>([])
  categorie = input<CategorieModel>()

  sauvegarder = output<{id:string, nom: string }>();
  annuler =  output()

  constructor(){
    effect(() => {
      if (this.categorie()) {
        this.form.patchValue({ Nom: this.categorie()!.nom });
      }
    });
  }


  readonly form : FormGroup = inject(FormBuilder).group({
    Nom : [[""], [Validators.required, Validators.maxLength(150)]]
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

    this.sauvegarder.emit({id: this.categorie()!.id, nom: nomSaisi });
  }

  onCancel(): void {
    this.annuler.emit();
  }

}
