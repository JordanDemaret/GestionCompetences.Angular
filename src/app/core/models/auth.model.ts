export interface InscriptionRequete extends ConnexionRequete{
    "nom": string,
    "prenom": string,  
}

export interface ConnexionRequete {
    "email": string,
    "motDePasse": string
}

export interface AccessToken {
    "accessToken" : string,
    "expiresAt" :string
}


