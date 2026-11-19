import { Component, output } from '@angular/core';
import { jsPDF } from "jspdf";
import { ButtonModule } from 'primeng/button';
@Component({
  imports: [ButtonModule],
  selector: 'app-pdf-competence',
  styleUrl: './pdf-competence.css',
  templateUrl: './pdf-competence.html',
})
export class PdfCompetence {

  fin =  output();

  savePdf() {
    const doc = new jsPDF();
    doc.text("Hello world!", 10, 10);
    doc.save("a4.pdf");
    this.onCancel();
  }

  onCancel(){
    this.fin.emit()
  }
}
