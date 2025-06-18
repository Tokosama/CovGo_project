# 🛠️ CovGo Backend

Welcome to the **CovGo Backend**! This is the API and business logic core of CovGo, the modern carpooling platform that connects drivers and passengers for eco-friendly, affordable, and easy travel.

---

## 🌱 Principle
- **Connect** people for shared journeys
- **Reduce** environmental impact
- **Make** carpooling simple, secure, and accessible

---

## ✨ Features
- Secure JWT authentication
- Trip management (create, update, delete, search)
- Booking system
- Real-time messaging (Socket.IO)
- User and vehicle management
- Admin features

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
$ npm install

# 2. Configure environment variables
$ cp .env.example .env
# Edit .env with your settings

# 3. Start the backend server
$ npm run dev
```

---

## 🗂️ Structure

```
backend/
├── src/
│   ├── controllers/    # Business logic
│   ├── models/         # Data models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   ├── services/       # Business services
│   ├── lib/            # Utilities & config
│   └── index.js        # Entry point
```

---

## 📚 API Endpoints (Examples)

### Authentication
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — User login

### Trips
- `GET /api/trajet` — List all trips
- `POST /api/trajet` — Create a trip

### Bookings
- `POST /api/reservation` — Create a booking
- `GET /api/reservation/user` — User's bookings

---

## 👤 Author
- Tokosama (Backend Developer)

---

## 📄 License
This project is licensed under the MIT License. See the `LICENSE` file for details.
