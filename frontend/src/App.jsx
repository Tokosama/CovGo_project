import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Welcome from "./pages/Welcome";
import About from "./pages/About";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import Notifs from "./pages/Notifs";
import Messages from "./pages/Messages";
import Profil from "./pages/Profil";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

                                                                                                                                                                                                                                                                                                                 
function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  console.log(authUser);

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
          element={!authUser ? <Register /> : <Navigate to="/profil" />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/profil" />}
        />
        <Route
          path="/home"
          element={authUser ? <home /> : <Navigate to="/login" />}
        />
        <Route
          path="/trips"
          element={authUser ? <Trips /> : <Navigate to="/login" />}
        />
        <Route
          path="/notifs"
          element={authUser ? <Notifs /> : <Navigate to="/login" />}
        />
        <Route
          path="/messages"
          element={authUser ? <Messages /> : <Navigate to="/login" />}
        />
        <Route
          path="/profil"
          element={authUser ? <Profil /> : <Navigate to="/login" />}
        />
      </Routes>
     <Toaster/>
    </Router>
  );
}

export default App;
