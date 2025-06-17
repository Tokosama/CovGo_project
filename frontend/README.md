# CovGo

CovGo is a modern web-based carpooling application designed to facilitate connections between drivers and passengers. The interface is built with a mobile-first approach, ensuring a smooth and intuitive user experience.

## 🚗 Key Features
- Secure account creation and authentication
- Advanced trip search by departure point, destination, date, and available seats
- Trip publication system for drivers
- Integrated messaging system between users
- Real-time notifications and profile management
- Responsive design with modern UI/UX principles

## 🛠️ Installation and Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CovGo_project/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
frontend/
├── public/                # Static assets (images, SVG, favicon...)
├── src/
│   ├── pages/            # Main application pages
│   │   ├── About/       # About page components
│   │   ├── Home/        # Homepage components
│   │   ├── Login/       # Login page components
│   │   ├── Messages/    # Messaging system components
│   │   ├── Notifs/      # Notifications components
│   │   ├── Profil/      # User profile components
│   │   ├── Register/    # Registration page components
│   │   ├── Trips/       # Trip management components
│   │   └── Welcome/     # Welcome page components
│   ├── components/      # Reusable UI components
│   │   ├── Details.jsx         # Trip details component
│   │   ├── FormPiece.jsx       # Form piece component
│   │   ├── FormVehicule.jsx    # Vehicle form component
│   │   ├── Header.jsx          # Main header component
│   │   ├── List-Trips.jsx      # Trip listing component
│   │   ├── LoadingSpinner.jsx  # Loading animation component
│   │   ├── More.jsx            # Additional options component
│   │   ├── Nav.jsx             # Navigation component
│   │   ├── OptimizedImage.jsx  # Image optimization component
│   │   ├── RecapProfil.jsx     # Profile summary component
│   │   └── SectionInitiale.jsx # Initial section component
│   ├── utils/           # Utility functions and helpers
│   ├── assets/          # Images, fonts, and other static files
│   ├── App.jsx          # Main routing configuration
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── package.json         # Project dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── eslint.config.js     # ESLint configuration
└── index.html          # HTML entry point
```

## ⚙️ Technology Stack
- [React 19](https://react.dev/) - Frontend library for building user interfaces
- [Vite](https://vitejs.dev/) - Next-generation frontend tooling
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [FontAwesome](https://fontawesome.com/) - Icon library
- [React Router](https://reactrouter.com/) - Client-side routing

## 🚀 Development Guidelines

### Code Style
- Follow ESLint configuration for consistent code style
- Use functional components with hooks
- Implement proper error handling
- Write meaningful component and function names

### Best Practices
- Keep components small and focused
- Implement proper loading states
- Use proper TypeScript types
- Follow mobile-first responsive design
- Implement proper error boundaries

## 👨‍💻 Authors
- Orelson14 (Product Owner & Frontend Developer)

## 🤝 Contributing
We welcome contributions! Here's how you can help:

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Pull Request Guidelines
- Update documentation for any new features
- Add tests for new functionality
- Ensure all tests pass
- Follow the existing code style
- Provide clear commit messages

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Environment Variables
Create a `.env` file in the root directory with the following variables:
```
VITE_API_URL=your_api_url
VITE_APP_ENV=development
```

## 📱 Mobile Support
- Fully responsive design
- Touch-friendly interface
- Progressive Web App (PWA) support
- Offline capabilities

## 🔐 Security
- JWT authentication
- HTTPS enforcement
- XSS protection
- CSRF protection
- Secure password handling
