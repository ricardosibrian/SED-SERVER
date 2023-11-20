import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import CustomButton from './components/button';

export default function FormDialog({id, fetchData}) {
  const [open, setOpen] = useState(false);
  const [rol, setRol] = useState(null);

  const handleClickOpen = () => {
    if (id) {
      setOpen(true);
    } else {
      window.alert('Seleccione un usuario antes de editarlo.');
    }
  };

  const handleRolChange = (event) => {
    setRol(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setRol(null);
    fetchData();
  };

  const handleAdd = async () => {
    try {
      if (!rol) {
        window.alert('Seleccione un rol antes de actualizar.');
        return;
      }
  
      // Obtener el token de localStorage
      const authToken = localStorage.getItem('authToken');
  
      // Realizar la solicitud Axios para actualizar el rol
      const response = await axios.post(
        'http://localhost:5000/api/user/updateRol',
        {
          id: id,
          rol: rol
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        }
      );
  
      // Manejar la respuesta exitosa, si es necesario
      console.log('Rol actualizado exitosamente:', response.data);
  
      // Cerrar el formulario después de actualizar el rol a un usuario
      handleClose();
    } catch (error) {
      // Manejar errores, si es necesario
      console.error('Error al actualizar el rol:', error);
      window.alert('Error al actualizar el rol.');
      handleClose(); // Cierra el diálogo después de hacer clic en "Eliminar"
    }
  };

  return (
    <React.Fragment>
      <CustomButton message="Editar rol" color="#898989" onClick={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>EDITAR EL ROL DE UN USUARIO</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Seleccione el rol que desea asignarle a este usuario.
          </DialogContentText>
          <Select
            value={rol}
            onChange={handleRolChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            fullWidth
          >
            <MenuItem value={null} disabled>ROL</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="user">User</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAdd}>ACEPTAR</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
