import { Component, inject, input, output } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { ButtonModule } from 'primeng/button';
import { CompetenceModel, VisibiliteEnum } from '../../../../core/models/competence.model';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { AuthService } from '../../../../core/services/auth.service';
import { RowInput } from 'jspdf-autotable';

@Component({
  imports: [ButtonModule, ReactiveFormsModule, InputText],
  selector: 'app-pdf-competence',
  styleUrl: './pdf-competence.css',
  templateUrl: './pdf-competence.html',
})
export class PdfCompetence {

  private authServ = inject(AuthService);

  competencesListe = input<CompetenceModel[]>([]);
  end =  output();

  readonly form = inject(FormBuilder).group({
    titre : ["", [Validators.required, Validators.maxLength(200)]],
    description : ["", [Validators.maxLength(400)]],
    nameFile : ["", [Validators.required, Validators.maxLength(200)]]
  });


  savePdf() {
    if(this.form.valid) {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();


      doc.setFillColor(30, 41, 59); 
      doc.rect(0, 0, pageWidth, 32, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(this.authServ.Prenom + " " + this.authServ.Nom, 14, 13);

      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(203, 213, 225);
      doc.text(this.form.controls['titre'].value!, 14, 20);

      doc.setFontSize(8);
      doc.text(this.form.controls['description'].value ?? "", 14, 27, { maxWidth: pageWidth - 28 });



      const visibles = this.competencesListe().filter((c) => c.visibilite === VisibiliteEnum.Public);

      const groupes = new Map<string, CompetenceModel[]>();
      for (const item of visibles) {
        const cat = item.categorieNom?.trim() || 'Autres compétences';
        if (!groupes.has(cat)) {
          groupes.set(cat, []);
        }
        groupes.get(cat)!.push(item);
      }

      let currentY = 40;

      // 3. Un mini-tableau propre par catégorie
      groupes.forEach((items, categorie) => {
  if (currentY > 255) {
    doc.addPage();
    currentY = 20;
  }

  doc.setTextColor(30, 41, 59);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(categorie, 14, currentY);

  const rows: RowInput[] = items.flatMap((c) => {
    const dateStr = c.dateDeDebut
      ? new Date(c.dateDeDebut as unknown as string).toLocaleDateString('fr-BE')
      : '';
    const mainRow = [c.nom, c.niveauLibelle ?? '', dateStr];

    return c.note?.trim()
      ? [
          mainRow,
          [
            {
              content: `Note : ${c.note.trim()}`,
              colSpan: 3,
              styles: { fontSize: 8, fontStyle: 'italic' },
            },
          ],
        ]
      : [mainRow];
  });

  autoTable(doc, {
    startY: currentY + 3,
    head: [['Compétence', 'Niveau', 'Depuis']],
    body: rows,
    theme: 'striped',
    margin: { left: 14, right: 14 },
    styles: {
      fontSize: 9,
      cellPadding: 2.5,
      textColor: [30, 41, 59],
    },
    headStyles: {
      fillColor: [30, 41, 59],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      cellPadding: 3,
    },
    columnStyles: {
      0: { cellWidth: 'auto', fontStyle: 'bold' },
      1: { cellWidth: 40 },
      2: { cellWidth: 34 },
    },
  });

  currentY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8;
});
      doc.save(this.form.controls['nameFile'].value + '.pdf');
      this.onCancel();
    }
  }

  onCancel(){
    this.end.emit()
  }
}
