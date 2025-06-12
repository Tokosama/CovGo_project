import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome"
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

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
      </Routes>
    </Router>
  );
}

export default App;
