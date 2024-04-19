import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./Styled.tsx";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{ minWidth: "400px", fontSize: "1.2rem" }}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
