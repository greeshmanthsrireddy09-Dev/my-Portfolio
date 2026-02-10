import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

const BASENAME = import.meta.env.BASE_URL;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={BASENAME}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

