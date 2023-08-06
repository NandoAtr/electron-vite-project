import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { HashRouter } from "react-router-dom";
import AuthProvider from "./Contexts/AuthContext";
import UserProvider from "./Contexts/UserContext";
import ThemeContextProvider from "./Contexts/ThemeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);

postMessage({ payload: "removeLoading" }, "*");
