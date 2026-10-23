export interface CertificatModel{
    id : string, 
    nomCertificat : string, 
    codeCertificat : string, 
    editeur  :  string|null , 
    dateObtention : Date, 
    nombreDeCompetencesLiees:  number
}