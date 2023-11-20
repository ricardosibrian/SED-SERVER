import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./Login/login";
import PrivateRoute from "./PrivateRoute"; // Asegúrate de importar tu componente PrivateRoute

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* Usa PrivateRoute con el componente hijo en la propiedad 'element' */}
          <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        </Routes>
      </Router>
    </div>
  );
}
