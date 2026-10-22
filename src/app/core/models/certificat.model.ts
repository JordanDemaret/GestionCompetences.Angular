export interface CertificatModel{
    id :string, 
    nomCertificat : string, 
    codeCertificat : string, 
    editeur  :  string|null , 
    dateObtention : Date, 
    utilisateurId : string, 
    nombreDeCompetencesLiees:  number
}