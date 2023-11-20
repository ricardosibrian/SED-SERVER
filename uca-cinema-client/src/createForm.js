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

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [movieTitle, setMovieTitle] = useState('');
  const [genre, setGenre] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setMovieTitle('');
    setGenre(null);
  };

  const handleAdd = async () => {
    try {
      // Obtener el token de localStorage
      const authToken = localStorage.getItem('authToken');
  
      // Verificar si hay un token antes de hacer la solicitud
      if (authToken) {
        // Realizar la solicitud POST con Axios, incluyendo el token en los encabezados
        const response = await axios.post('/api/movie/create', {
          title: movieTitle,
          description: genre,
          genre: 'default.png',
        }, {
          headers: {
            authorization: `Bearer ${authToken}`,
          },
        });
  
        // Cerrar el diálogo después de agregar la película
        handleClose();
  
        // Recargar la página después de cerrar el diálogo
        window.location.reload();
      } else {
        console.error('No se encontró un token de autorización');
      }
    } catch (error) {
      // Manejar errores, si es necesario
      console.error('Error al agregar película:', error);
    }
  };

  return (
    <React.Fragment>
      <CustomButton variant="contained" message="Agregar pelicula" color="#232325" onClick={handleClickOpen}  />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 'bold' }}>AGREGAR NUEVA PELÍCULA</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rellene los campos solicitados para agregar una nueva película a la cartelera semanal.
          </DialogContentText>
          <TextField
            sx={{ marginBottom: '20px' }}
            autoFocus
            margin="dense"
            id="movie"
            label="Nombre de la película"
            fullWidth
            variant="standard"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <Select
            value={genre}
            onChange={handleGenreChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            fullWidth
          >
            <MenuItem value={null} disabled>Género de la película</MenuItem>
            <MenuItem value="Drama">Drama</MenuItem>
            <MenuItem value="Comedia">Comedia</MenuItem>
            <MenuItem value="Acción">Acción</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleAdd}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
