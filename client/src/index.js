import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import AuthProvider from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";

import { ToastProvider } from "react-toast-notifications";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider
        placement="top-center"
        autoDismissTimeout={1500}
        autoDismiss
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
