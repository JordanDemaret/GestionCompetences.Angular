import { Component, inject, OnInit, signal } from '@angular/core';
import { CertificatServices } from '../../../core/services/certificat.services';
import { CertificatModel } from '../../../core/models/certificat.model';
import { TableModule } from 'primeng/table';

@Component({
  imports: [TableModule],
  selector: 'app-certificat',
  styleUrl: './certificat.css',
  templateUrl: './certificat.html',
})
export class Certificat implements OnInit {
  
  readonly certificatServ = inject(CertificatServices);
  public certificatListe = signal<CertificatModel[]>([]);

  ngOnInit(): void {
    this.certificatServ.getAllCertificats().subscribe({
      next : (certificats : CertificatModel[]) => {
        console.log(certificats)
        this.certificatListe.set(certificats)
      }
    })
  }

}
