import React from "react";
import logo from "../assets/logo_uca.png";
import axios from "axios";

function SignInForm(props) {
  const [state, setState] = React.useState({
    email: "",
    password: ""
  });
  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { email, password } = state;

    for (const key in state) {
      setState({
        ...state,
        [key]: ""
      });
    }

    try {
      // Llamada a la API para autenticar
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin", {
          identifier: email,
          password: password
        });

      // Manejo del token - Almacénalo en el estado o en el contexto según tus necesidades
      const authToken = response.data.token;

      // Ejemplo de almacenamiento en el estado local (puedes usar Redux o Context para algo más global)
      localStorage.setItem("authToken", authToken);

      // Limpiar el formulario
      setState({ email: "", password: "" });

      alert("Inicio de sesión exitoso");

      // Redirigir o realizar otras acciones necesarias después del inicio de sesión
      props.onSignIn();

    } catch (error) {
      // Manejar errores de autenticación
      alert("Inicio de sesión fallido");
    }    
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
      <img src={logo} alt="logo" style={{ width: '150px', marginBottom: '0', marginTop: '0' }} />
      <h1>Inicio de sesión</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={state.password}
          onChange={handleChange}
        />
        {/* <a href="#">Olvidé mi contraseña</a> */}
        <button id="signInButton" type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
