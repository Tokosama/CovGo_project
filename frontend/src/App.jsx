import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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
import PublierTrajet from "./pages/PublierTrajet";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { authUser } = useAuthStore();
  const location = useLocation();

  if (!authUser) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (authUser.verifie === false && location.pathname !== "/profil") {
    toast.error("Veuillez vérifier votre profil avant de continuer.");
    return (
      <Navigate
        to="/profil"
        replace
      />
    );
  }

  if (requiredRole && authUser.role !== requiredRole) {
    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

  return children;
};

const PublicRoute = ({ children }) => {
  const { authUser } = useAuthStore();

  if (authUser) {
    if (authUser.verifie === false) {
      return (
        <Navigate
          to="/profil"
          replace
        />
      );
    }
    return (
      <Navigate
        to="/home"
        replace
      />
    );
  }

  return children;
};

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
        <span className="ml-2 text-gray-600">
          Vérification de la connexion...
        </span>
      </div>
    );
  }

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
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              {authUser === null ? (
                <div className="flex items-center justify-center h-screen">
                  <Loader className="size-10 animate-spin text-[#00B4D8]" />
                </div>
              ) : authUser.role === "conducteur" ? (
                <Navigate
                  to="/publier"
                  replace
                />
              ) : (
                <Home />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <Trips />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifs"
          element={
            <ProtectedRoute>
              <Notifs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profil"
          element={
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publier"
          element={
            <ProtectedRoute requiredRole="conducteur">
              <PublierTrajet />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Navigate
              to={
                authUser
                  ? authUser.verifie === true
                    ? "/home"
                    : authUser.verifie === false
                    ? "/profil"
                    : "/home"
                  : "/"
              }
              replace
            />
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
