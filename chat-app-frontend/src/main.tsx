import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { ToastProvider } from "./context/ToastContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <UserProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </UserProvider>
  </BrowserRouter>,
);
