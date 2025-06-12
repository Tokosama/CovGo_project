# CovGo

CovGo est une application web moderne de covoiturage, conçue pour faciliter la mise en relation entre conducteurs et passagers. L'interface est pensée pour une expérience utilisateur fluide, mobile-first et intuitive.

## 🚗 Fonctionnalités principales
- Création de compte et connexion sécurisée
- Recherche de trajets par point de départ, destination, date et nombre de places
- Publication de trajets pour les conducteurs
- Messagerie intégrée entre utilisateurs
- Notifications et gestion de profil
- Interface responsive et design moderne

## 🛠️ Installation et lancement

1. **Cloner le dépôt**
   ```bash
   git clone <url-du-repo>
   cd CovGo_project/frontend
   ```
2. **Installer les dépendances**
   ```bash
   npm install
   ```
3. **Lancer le projet en développement**
   ```bash
   npm run dev
   ```
4. **Accéder à l'application**
   Ouvrez [http://localhost:5173](http://localhost:5173) dans votre navigateur.

## 📁 Structure du projet

```
frontend/
├── public/                # Images, SVG, favicon...
│   ├── pages/             # Pages principales (Home, Register, Login, About...)
│   ├── components/        # Composants réutilisables
│   ├── assets/            # Images, polices, etc.
│   ├── App.jsx            # Routing principal
│   └── main.jsx           # Point d'entrée React
├── package.json
├── tailwind.config.js
└── ...
```

## ⚙️ Technologies utilisées
- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [FontAwesome](https://fontawesome.com/)
- [React Router](https://reactrouter.com/)

## 👨‍💻 Auteurs
- Ninsh (Product Owner & Dev Front)
- [Ton nom ici]

## 🤝 Contribuer
Les contributions sont les bienvenues !
- Forkez le projet
- Créez une branche (`git checkout -b feature/ma-feature`)
- Commitez vos modifications (`git commit -am 'feat: nouvelle fonctionnalité'`)
- Pushez la branche (`git push origin feature/ma-feature`)
- Ouvrez une Pull Request

## 📄 Licence
Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus d'informations.
