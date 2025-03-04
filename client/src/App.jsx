import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { getCurrentUser } from "./services/authService";
import "./App.css";

// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    // Check authentication status on app load
    const user = getCurrentUser();
    if (user && user.token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        
        <main className="flex-grow">
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <LoginPage setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            <Route
              path="/register"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <RegisterPage setIsLoggedIn={setIsLoggedIn} />
                )
              }
            />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; {new Date().getFullYear()} Messaging App</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
