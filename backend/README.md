# CovGo - Application de Covoiturage

## Description
CovGo est une application web moderne de covoiturage qui permet aux utilisateurs de partager leurs trajets, de réserver des places et de gérer leurs déplacements de manière efficace et écologique.

## Prérequis
- Node.js (version 14 ou supérieure)
- MongoDB (version 4.4 ou supérieure)
- npm ou yarn

## Installation

### 1. Cloner le projet
```bash
git clone [URL_DU_REPO]
cd CovGo_project
```

### 2. Configuration du Backend

#### Installation des dépendances
```bash
cd backend
npm install
```

#### Configuration des variables d'environnement
Créez un fichier `.env` dans le dossier `backend` avec les variables suivantes :
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/covgo
SESSION_SECRET=votre_secret_tres_securise
```

#### Démarrer le serveur backend
```bash
npm run dev
```

### 3. Configuration du Frontend

#### Installation des dépendances
```bash
cd frontend
npm install
```

#### Démarrer le serveur frontend
```bash
npm run dev
```

## Structure du Projet

### Backend
```
backend/
├── src/
│   ├── controllers/    # Logique métier
│   ├── models/        # Modèles de données
│   ├── routes/        # Routes API
│   ├── middleware/    # Middleware personnalisés
│   ├── services/      # Services métier
│   ├── lib/          # Utilitaires et configurations
│   └── index.js      # Point d'entrée
```

### Frontend
```
frontend/
├── src/
│   ├── components/    # Composants React
│   ├── pages/        # Pages de l'application
│   ├── services/     # Services API
│   ├── utils/        # Utilitaires
│   └── App.js        # Composant principal
```

## Fonctionnalités Principales

- Authentification des utilisateurs
- Gestion des trajets
- Système de réservation
- Messagerie entre utilisateurs
- Système d'évaluation
- Gestion des véhicules
- Administration

## API Endpoints

### Authentification
- POST `/api/auth/register` - Inscription
- POST `/api/auth/login` - Connexion
- POST `/api/auth/logout` - Déconnexion

### Trajets
- GET `/api/trajet` - Liste des trajets
- POST `/api/trajet` - Créer un trajet
- GET `/api/trajet/:id` - Détails d'un trajet
- PUT `/api/trajet/:id` - Modifier un trajet
- DELETE `/api/trajet/:id` - Supprimer un trajet

### Réservations
- POST `/api/reservation` - Créer une réservation
- GET `/api/reservation/user` - Réservations de l'utilisateur
- PUT `/api/reservation/:id` - Modifier une réservation
- DELETE `/api/reservation/:id` - Annuler une réservation

## Technologies Utilisées

### Backend
- Node.js
- Express.js
- MongoDB avec Mongoose
- Socket.IO pour la messagerie en temps réel
- JWT pour l'authentification

### Frontend
- React.js
- Vite
- Tailwind CSS
- Socket.IO Client

## Contribution

1. Fork le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence
Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Support
Pour toute question ou problème, veuillez ouvrir une issue dans le repository GitHub.

## Auteurs
- [Votre Nom] - Développeur Principal

## Remerciements
- Merci à tous les contributeurs qui ont participé au projet
- Merci à la communauté open source pour les outils et bibliothèques utilisés 