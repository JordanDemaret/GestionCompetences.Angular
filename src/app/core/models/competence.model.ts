export enum VisibiliteEnum {
  Public = 0,
  Prive = 1
}

export enum StatutEnum {
  AAcquerir = 0,
  EnCours = 1,
  Acquise = 2
}

export interface CompetenceModel{
    id : string;
    nom : string;
    note : string|null;
    dateDeDebut : Date;
    visibilite : VisibiliteEnum;
    statut : StatutEnum;
    categorieId : string,
    categorieNom : string,
    niveauId : string,
    niveauLibelle : string,
    position: number;
    
    //certificatId : string| null ;
}

