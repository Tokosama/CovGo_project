import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome"
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Notifs from "./pages/Notifs";
import Messages from "./pages/Messages";
import Profil from "./pages/Profil";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Welcome />}
        />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/register"
            element={<Register />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/trips"
            element={<Trips />}
          />
          <Route
            path="/notifs"
            element={<Notifs />}
          />
          <Route
            path="/messages"
            element={<Messages />}
          />
          <Route
            path="/profil"
            element={<Profil />}
          />
      </Routes>
    </Router>
  );
}

export default App;
