import React, { useState, useEffect } from "react";
import "../App.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import { useNavigate } from "react-router-dom";


export default function App() {
    const navigate = useNavigate();
  const [type, setType] = useState("signIn");

  useEffect(() => {
    localStorage.removeItem("authToken");
  }, []);
  
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const handleSignIn = () => {
    navigate("/home");
  };

  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App" >
      <div className={containerClass} id="container" >
        <SignUpForm />
        <SignInForm onSignIn={handleSignIn} />
        <div className="overlay-container" >
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>¿Ya tienes una cuenta?</h1>
              <p>
                Inicia sesión con tu cuenta para consultar la cartelera
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Iniciar sesión
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>¿Aún no tienes una cuenta?</h1>
              <p>Crea una cuenta y descubre todos los beneficios de UCA Cinema</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}