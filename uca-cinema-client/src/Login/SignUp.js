import * as React from 'react';
import axios from 'axios';

function SignUpForm() {
  const [state, setState] = React.useState({
    username: '',
    first_name: '',
    lastname: '',
    email: '',
    password: '',
    repeat_password: '',

  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();
    if (state.password === state.repeat_password) {
    try {
      // Realizar la solicitud POST con Axios
      const response = await axios.post('/api/auth/signup', {
        username: state.username,
        email: state.email,
        password: state.password,
        first_name: state.first_name,
        last_name: state.last_name,
      });
      
      window.alert('Cuenta creada con éxito.');

      setState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        repeat_password: '',
      });
      
    } catch (error) {
      window.alert('Error al crear la cuenta.');
    }
  }
  else{
    // Contraseñas no coinciden, mostrar un mensaje de error
    window.alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
  }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Crear una cuenta</h1>
        <input
          type="name"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="name"
          name="first_name"
          value={state.first_name}
          onChange={handleChange}
          placeholder="Primer nombre "
        />
        <input
          type="name"
          name="last_name"
          value={state.last_name}
          onChange={handleChange}
          placeholder="Primer apellido"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Contraseña"
        />
        <input
          type="password"
          name="repeat_password"
          value={state.repeat_password}
          onChange={handleChange}
          placeholder="Repita la contraseña"
        />
        <button id="signUpButton" type="submit">
          Crear cuenta
        </button>
      </form>
    </div>
  );
}

export default SignUpForm;
