import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CustomButton from '../components/button';
import axios from 'axios';

export default function BasicTextFields() {
  const [userData, setUserData] = useState({
    id:'',
    username: '',
    password: '',
    newPassword: '',
    repeatNewPassword: ''
  });
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    axios.get('/api/auth/whoami', {
      headers: {
        authorization: `Bearer ${authToken}`
      }
    })
    .then(response => {
      setUserData(prevState => ({
        ...prevState,
        id: response.data.id,
        username: response.data.username
      }));
    })
    .catch(error => {
      console.error('Error al obtener datos del usuario:', error);
      alert('Error al obtener datos del usuario:');
    });
  }, []);

  const handleInputChange = (field, value) => {
    setUserData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };
  
  const [showPassword, setShowPassword] = React.useState({
    password: false,
    newPassword: false,
    repeatNewPassword: false,
  });

  const handleShowPassword = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleEditClick = async () => {
    if (userData.newPassword === userData.repeatNewPassword) {
      try {
        const response = await axios.post(
          '/api/auth/newprofile',
          {
            id: userData.id,
            username: userData.username,
            password: userData.newPassword
          },
          {
            headers: {
              authorization: `Bearer ${authToken}`
            }
          }
        );
  
        // Manejar la respuesta exitosa
        window.alert('Datos actualizados exitosamente');
        //window.alert(`ID: ${userData.id}, user: ${userData.username}, password: ${userData.newPassword}`);
  
        // Limpiar los campos
        setUserData(prevState => ({
          ...prevState,
          newPassword: '',
          repeatNewPassword: ''
        }));
  
        // Actualizar datos del usuario
        const whoamiResponse = await axios.get('/api/auth/whoami', {
          headers: {
            authorization: `Bearer ${authToken}`
          }
        });
  
        // Actualizar el estado con los nuevos datos del usuario
        setUserData(prevState => ({
          ...prevState,
          username: whoamiResponse.data.username
        }));
  
        // Limpiar los campos de contraseña en el TextField
        document.getElementById('new-password').value = '';
        document.getElementById('repeat-new-password').value = '';
      } catch (error) {
        // Contraseñas coinciden, pero hay un error en la solicitud
        console.error('Error al actualizar datos del usuario:', error);
        window.alert('Error al actualizar datos del usuario.');
      }
    } else {
      // Contraseñas no coinciden, mostrar un mensaje de error
      window.alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
    }
  };
  

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        width: '660px',
        flexDirection: 'column',
        alignItems: 'center',
        '& > :not(style)': { m: 1, width: '50ch' },
        paddingBottom: '30px',
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        label="Usuario"
        id="user"
        variant="standard"
        value={userData.username}
        onChange={(e) => handleInputChange('username', e.target.value)}
      />
      <FormControl variant="filled" sx={{ width: '100%' }}>
        <InputLabel htmlFor="new-password">Escriba su nueva contraseña</InputLabel>
        <Input
          id="new-password"
          type={showPassword.newPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleShowPassword('newPassword')}
                edge="end"
              >
                {showPassword.newPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          onChange={(e) => handleInputChange('newPassword', e.target.value)}
        />
      </FormControl>
      <FormControl variant="filled" sx={{ width: '100%' }}>
        <InputLabel htmlFor="new-password">Repita su nueva contraseña</InputLabel>
        <Input
          id="repeat-new-password"
          type={showPassword.repeatNewPassword ? 'text' : 'password'}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleShowPassword('repeatNewPassword')}
                edge="end"
              >
                {showPassword.repeatNewPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          onChange={(e) => handleInputChange('repeatNewPassword', e.target.value)}
        />
      </FormControl>

      <CustomButton message="Actualizar datos" color="#c7292a" onClick={handleEditClick} />
    </Box>
  );
}
