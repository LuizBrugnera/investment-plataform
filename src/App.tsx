import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Navbar } from "./components/Navbar";
import { Register } from "./pages/Register";
import { AppProvider } from "./appContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AppProvider>
      <>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              !loggedIn ? (
                <Login setLoggedIn={setLoggedIn} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="/dashboard"
            element={loggedIn ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route path="register/:affiliate" element={<Register />} />
          <Route path="register/" element={<Register />} />
          <Route path="login" element={<Login setLoggedIn={setLoggedIn} />} />
        </Routes>
      </>
    </AppProvider>
  );
}

export default App;
