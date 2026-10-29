# 🎓 GestionCompetences - Frontend Angular

Application web moderne permettant le suivi, l'organisation et la valorisation des compétences personnelles et professionnelles. Développée avec **Angular**, **PrimeNG** et une architecture réactive basée sur les **Signals**.

---

## 📋 Table des Matières

- [Aperçu du Projet](#-aperçu-du-projet)
- [Fonctionnalités Principales](#-fonctionnalités-principales)
- [Stack Technique & Dépendances](#-stack-technique--dépendances)
- [Architecture du Code](#-architecture-du-code)
- [Prérequis](#-prérequis)
- [Installation & Démarrage](#-installation--démarrage)
- [Scripts Disponibles](#-scripts-disponibles)
- [Déploiement Docker](#-déploiement-docker)

---

## 🌟 Aperçu du Projet

**GestionCompetences** offre un espace dédié pour :
- **Utilisateurs standards :** Gérer leur catalogue personnel de compétences, associer des certifications officielles, organiser l'ordre de priorité par glisser-déposer, filtrer et suivre leur niveau de maîtrise.
- **Administrateurs :** Gérer le référentiel global des catégories.

---

## ✨ Fonctionnalités Principales

### 🔐 Authentification & Sécurité (RBAC)
- **Inscription & Connexion :** Formulaires réactifs avec validation personnalisée de la complexité des mots de passe.
- **Directive UI :** Affichage / masquage du mot de passe en un clic (`[appAfficherMotDePasse]`).
- **Sécurité JWT :** Stockage en session (`sessionStorage`), intercepteur HTTP (`TokenInterceptor`) injectant automatiquement le Bearer token et gestion du Refresh Token.
- **Guards de Navigation :**
  - `guestGuard` : Redirige les utilisateurs connectés tentant d'accéder aux pages de login/register.
  - `rolesGuard` : Bloque l'accès aux interfaces administratives aux comptes non-admin.

### 🎯 Gestion des Compétences
- **CRUD complet :** Création, modification et suppression de compétences avec gestion de la visibilité (Public / Privé), du statut et des notes personnelles.
- **Drag & Drop (Angular CDK) :** Réordonnancement interactif des compétences par glisser-déposer avec mise à jour automatique des positions.
- **Filtrage avancé :** Filtrage combiné par nom, catégorie, niveau, statut, visibilité et dates d'acquisition. Le drag & drop est désactivé automatiquement lorsqu'un filtre est actif pour préserver la cohérence des positions.
- **Persistance en un clic :** Détection réactive des changements via signal (`hasChanged`) avec bouton d'enregistrement dédié.
- **Fix Timezone :** Normalisation des dates pour éviter les décalages de fuseau horaire UTC.

### 📜 Gestion des Certificats
- Gestion (CRUD) des certifications professionnelles (nom, code, éditeur, date d'obtention).
- Liaison directe entre compétences et certificats associés.

### 🏷️ Gestion des Catégories(Admin)
- Administration des catégories  sous forme de dialogues modaux PrimeNG (`p-dialog`, `p-select`).

---

## 🛠️ Stack Technique & Dépendances

- **Framework :** [Angular](https://angular.dev/) 22 (Standalone Components, Signals réactifs, `inject()`)
- **Composants UI :** [PrimeNG](https://primeng.org/) & [PrimeIcons](https://primeng.org/icons)
- **Style :** CSS modulaire & [TailwindCSS](https://tailwindcss.com/)
- **Drag & Drop :** `@angular/cdk/drag-drop`
- **Requêtes & État :** RxJS & Angular Signals (`signal`, `computed`, `effect`)
- **Conteneurisation :** Docker & Nginx Alpine

---

## 📂 Architecture du Code

```text
src/app/
├── core/
│   ├── guards/          # guestGuard, rolesGuard (protection RBAC)
│   ├── intercepteur/    # token-interceptor (injection JWT & refresh)
│   ├── models/          # Interfaces TypeScript (auth, competence, certificat, etc.)
│   └── services/        # Services API (auth, competence, certificat, etc.)
├── features/
│   ├── auth/            # Connexion & Inscription
│   ├── competence/      # Gestion des compétences, catégories & certificats
│   ├── home/            # Page d'accueil publique
│   └── layout/          # Navbar publique & UtilisateurNavBar latérale
└── shared/
    ├── directives/      # AfficherMotDePasseDirective
    ├── pipes/           # StatutPipe, VisibilitePipe
    └── validators/      # mot-de-passe.validator
```

---

## ⚙️ Prérequis

- **Node.js** : v20.x ou v22.x LTS recommandé
- **npm** : v10.x ou plus
- **[Backend API](https://github.com/JordanDemaret/GestionCompetences)**  : ASP.NET Core Web API en cours d'exécution

---

## 🚀 Installation & Démarrage

1. **Cloner le projet :**
   ```bash
   git clone https://github.com/JordanDemaret/GestionCompetences.Angular.git
   cd GestionCompetences.Angular
   ```

2. **Installer les dépendances :**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Lancer le serveur de développement :**
   ```bash
   npm start
   # ou
   ng serve
   ```
   Rendez-vous ensuite sur `http://localhost:4200/`.

---

## 📜 Scripts Disponibles

| Commande | Description |
| :--- | :--- |
| `npm start` | Lance le serveur local de dev (`ng serve`) |
| `npm run build` | Compile l'application pour la production dans `/dist` |
| `npm run watch` | Compile avec rechargement automatique en environnement dev |
| `npm test` | Exécute les tests unitaires |

2. **Installer les dépendances :**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Configurer l'environnement :**
   Vérifiez l'URL de votre API dans [src/environments/environment.development.ts](src/environments/environment.development.ts) :
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:5000/api'
   };
   ```

4. **Lancer le serveur de développement :**
   ```bash
   npm start
   # ou
   ng serve
   ```
   Rendez-vous ensuite sur `http://localhost:4200/`.

---

## 🐳 Déploiement Docker

Le projet intègre un `Dockerfile` multi-stage (Node 22 pour le build, Nginx Alpine pour la distribution) :

1. **Construire l'image :**
   ```bash
   docker build -t gestion-competences-angular .
   ```

2. **Lancer le conteneur :**
   ```bash
   docker run -d -p 8080:80 --name gestion-competences-front gestion-competences-angular
   ```
   L'application sera accessible sur `http://localhost:8080`.

