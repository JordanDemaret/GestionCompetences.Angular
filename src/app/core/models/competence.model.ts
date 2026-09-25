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
    dateDeDebut : Date|string;
    visibilite : VisibiliteEnum;
    statut : StatutEnum;
    
    categorieId : string,
    categorie : string,
    niveauId : string,
    niveau : string,
    
    //utilisateurId : string;
    //certificatId : string| null ;
    //lien : string|null, 
    //position: number;
    //nomGroupe: string;

}

