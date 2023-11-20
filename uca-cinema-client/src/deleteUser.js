import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomButton from './components/button';
import axios from 'axios';

export default function AlertDialog({id, fetchData}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (id) {
      setOpen(true);
    } else {
      window.alert('Seleccione un usuario antes de intentar eliminarlo.');
    }
  };

  const handleClose = () => {
    setOpen(false);
    fetchData();
  };

  const handleDeleteClick = async () => {
    const authToken = localStorage.getItem("authToken");
  
    try {
      // Realiza la solicitud Axios para eliminar el usuario
      const response = await axios.delete(
        '/api/user/deleteUser/', 
        {
          headers: {
            'Content-Type': 'application/json', // Asegúrate de establecer el tipo de contenido
            authorization: `Bearer ${authToken}`
          },
          data: {
            id: id // Pasa el ID en el cuerpo
          }
        }
      );
      handleClose(); // Cierra el diálogo después de hacer clic en "Eliminar"
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      window.alert('Error al eliminar el usuario.');
      handleClose(); // Cierra el diálogo después de hacer clic en "Eliminar"
    }
  };
  
  return (
    <React.Fragment>
      <CustomButton message="Eliminar" color="#c7292a" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{ fontWeight: 'bold' }} id="alert-dialog-title">
          ELIMINAR USUARIO
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro que deseas eliminar a este usuario del sistema?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDeleteClick} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
