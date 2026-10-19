export interface InscriptionRequete extends ConnexionRequete{
    "nom": string,
    "prenom": string,  
}

export interface ConnexionRequete {
    "email": string,
    "motDePasse": string
}

export interface UtilisateurInfo extends TokenInfo {
    "id": string,
    "nom": string,
    "prenom": string,
    "email": string,
    "role": string,
    
}

export interface TokenInfo{
    "token": string,
    "refreshToken" : string
}


