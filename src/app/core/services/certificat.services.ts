import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import {CertificatModel } from '../models/certificat.model';

@Service()
export class CertificatServices {

    private readonly http = inject(HttpClient);
    private readonly UrlBase = environment.apiUrl + '/certificat'

    getAllCertificats() : Observable<CertificatModel[]>{
        return this.http.get<CertificatModel[]>(this.UrlBase);
    }

    postCertificat(nouveauCertificat : CertificatModel) : Observable<CertificatModel>{
        return this.http.post<CertificatModel>(this.UrlBase,nouveauCertificat)
    }


}
