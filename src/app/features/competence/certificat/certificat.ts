import { Component, inject, OnInit, signal } from '@angular/core';
import { CertificatServices } from '../../../core/services/certificat.services';
import { CertificatModel } from '../../../core/models/certificat.model';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { AjouterCetificat } from './ajouter-cetificat/ajouter-cetificat';
import { DatePipe } from '@angular/common';
import { ModdifierCetificat } from './moddifier-cetificat/moddifier-cetificat';

@Component({
  imports: [TableModule, Button, Dialog, DatePipe, AjouterCetificat, ModdifierCetificat],
  selector: 'app-certificat',
  styleUrl: './certificat.css',
  templateUrl: './certificat.html',
})
export class Certificat implements OnInit {
  
  readonly certificatServ = inject(CertificatServices);
  public certificatListe = signal<CertificatModel[]>([]);

  ajouterCertif = false;
  moddifCertif = false;
  supprimerCertif = false;

  CertifSelec = signal<CertificatModel|null>(null)

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

   ouvrirModification (certif : CertificatModel) : void{
     this.moddifCertif=true;
     this.CertifSelec.set(certif)
    }
    
    ouvrirSuppression (certif : CertificatModel) : void{
      this.supprimerCertif= true; 
      this.CertifSelec.set(certif);
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

  modifierCertificat(certificat : CertificatModel) {
      this.certificatServ.putCertificat(certificat).subscribe({
        next: () => {
          this.certificatListe.update(liste => liste.map(c => c.id === certificat.id? certificat : c ) );
        },
        error: (err) => {
          console.error('Erreur lors de l\'enregistrement en BDD :', err);
        },
        complete: () => {
          this.moddifCertif = false;
        }
      })
    }

  supprimerCertificat() : void {
    const currentSelected = this.CertifSelec();
    if (!currentSelected) return;

    this.certificatServ.deleteCertificat(currentSelected.id).subscribe({
      next : () => {
        this.certificatListe.update(liste => liste.filter(c => c.id !== currentSelected.id))
      },
      error: (err) => {
        console.error('Erreur lors de l\'enregistrement en BDD :', err);
      },
      complete : () => {
        this.supprimerCertif = false
        this.CertifSelec.set(null)
      }
    })
  }

}
