import { Component, inject, OnInit, signal } from '@angular/core';
import { CertificatServices } from '../../../core/services/certificat.services';
import { CertificatModel } from '../../../core/models/certificat.model';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { AjouterCetificat } from './ajouter-cetificat/ajouter-cetificat';
import { DatePipe } from '@angular/common';

@Component({
  imports: [TableModule, Button, Dialog,DatePipe, AjouterCetificat],
  selector: 'app-certificat',
  styleUrl: './certificat.css',
  templateUrl: './certificat.html',
})
export class Certificat implements OnInit {
  
  readonly certificatServ = inject(CertificatServices);
  public certificatListe = signal<CertificatModel[]>([]);

  ajouterCertif = false

  ngOnInit(): void {
    this.certificatServ.getAllCertificats().subscribe({
      next : (certificats : CertificatModel[]) => {
        this.certificatListe.set(certificats)
      }
    })
  }

  ouvrirAjout() : void {
    this.ajouterCertif = true;
  }

  ajouterCertificat(nouveauCertificat : CertificatModel) : void {
    this.certificatServ.postCertificat(nouveauCertificat).subscribe({
       next: (certificat) =>{
        this.certificatListe.update(list => [...list, certificat ])
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement en BDD :', err);
      },
      complete: () => {
        this.ajouterCertif = false;
      }
    })

  }


}
