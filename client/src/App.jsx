import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useCheckAuth } from "./hooks/useAuth";
import "./App.css";
import MessagesPage from "./pages/MessagesPage";
import SendMessageForm from "./components/forms/SendMessageForm";

// Create a React Query client

function App() {
  const { isAuthenticated } = useCheckAuth();

  return (
    <Router>
      <div className="h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div
          className="container mx-auto md:px-4 flex-1"
          style={{ height: "calc(100vh - 4.5rem)" }}
        >
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <MessagesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sendMessage"
              element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <SendMessageForm />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
