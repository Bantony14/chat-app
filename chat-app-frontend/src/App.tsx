import "./App.css";
import ChatDashboard from "./pages/ChatDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useUser } from "./context/UserContext";
import FullScreenLoader from "./components/FullScreenLoader";

function App() {
  const { user, loading } = useUser();

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      {}
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/chat-dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Registration />} />
        <Route path="/forgot-Password" element={<ForgotPassword />} />
        <Route path="/chat-dashboard" element={<ChatDashboard />} />
      </Routes>
    </>
  );
}

export default App;
