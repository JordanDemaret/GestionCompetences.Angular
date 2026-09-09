export interface InscriptionRequete extends ConnectionRequete{
    "nom": string,
    "prenom": string,  
}

export interface ConnectionRequete {
    "email": string,
    "motDePasse": string
}

export interface AccessToken {
    "accessToken" : string,
    "expiresAt" :string
}


