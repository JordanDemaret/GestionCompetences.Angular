import { Component, input, output } from '@angular/core';
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';
import { ButtonModule } from 'primeng/button';
import { CompetenceModel, VisibiliteEnum } from '../../../../core/models/competence.model';

@Component({
  imports: [ButtonModule],
  selector: 'app-pdf-competence',
  styleUrl: './pdf-competence.css',
  templateUrl: './pdf-competence.html',
})
export class PdfCompetence {

  competencesListe = input<CompetenceModel[]>([]);
  end =  output();

  savePdf() {
    const doc = new jsPDF();
    const body = this.competencesListe().filter(c => c.visibilite == VisibiliteEnum.Public)
            .map(c => [
              c.nom, 
              c.dateDeDebut ? new Date(c.dateDeDebut as unknown as string).toLocaleDateString('fr-BE') : '',
              c.categorieNom ?? '',
              c.niveauLibelle ?? '',]);



    autoTable(doc, {
      head :  [['Nom', 'Date de début', "Catégorie", "Niveau"]],
      body : body?? []
    })
    

    
    doc.save("a4.pdf");
    this.onCancel();
  }

  onCancel(){
    this.end.emit()
  }
}
