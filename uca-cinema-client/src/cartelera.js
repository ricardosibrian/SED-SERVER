import React, { useState, useEffect } from 'react';
import MultiActionAreaCard from './components/cards';
import MultiActionAreaCard2 from './components/cards2';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import banner from "./assets/banner.jpg";
import hungerImage from './assets/hunger.jpeg';
import marvelsImage from './assets/marvels.jpg';
import wonkaImage from './assets/wonka.jpeg';
import napoleonImage from './assets/napoleon.jpg';
import Carousel from './Carousel';
import axios from 'axios';

const Cartelera = () => {
  const [moviesData, setMoviesData] = useState([]);

  useEffect(() => {

    const authToken = localStorage.getItem("authToken");

    if (authToken) {
      axios.get('/api/movie/', {
        headers: {
          authorization: `Bearer ${authToken}`
        }
      }) 
      .then(response => {
        setMoviesData(response.data.movies);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
    } else {
      // Manejar la situación cuando no hay un token (puedes redirigir al usuario a iniciar sesión)
      console.log("No hay token. Redirigir al usuario a iniciar sesión.");
    }
  }, []); 

    return (
        <div>  
          <Typography variant="h5" align="left" sx={{  marginLeft: '20px', marginTop: '10px', marginBottom: '10px', color: '#EBB401', fontWeight: 'bold' }}>
            ESTRENOS
          </Typography>   
          <Carousel />
          <Typography variant="h5" align="left" sx={{ marginLeft: '20px', marginTop: '30px', marginBottom: '10px', color: '#EBB401', fontWeight: 'bold' }}>
            CARTELERA SEMANAL
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            {/* Tarjetas obtenidas de la API */}
            {moviesData.map(movie => (
              <Grid item key={movie.title}>
                <MultiActionAreaCard
                  image={require(`./assets/${movie.genre}`)}  
                  title={movie.title}
                />
              </Grid>
            ))}
          </Grid>

        <Typography variant="h5" align="left" sx={{ marginLeft: '20px', marginTop: '40px', marginBottom: '10px', color: '#EBB401', fontWeight: 'bold' }}>
            PRÓXIMAMENTE
          </Typography>

      <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <MultiActionAreaCard2 image={marvelsImage} date="09 NOV. 2023" />
          </Grid>
          <Grid item>
            <MultiActionAreaCard2 image={hungerImage} date="17 NOV. 2023" />
          </Grid>
          <Grid item>
            <MultiActionAreaCard2 image={napoleonImage} date="23 NOV. 2023" />
          </Grid>
          <Grid item>
            <MultiActionAreaCard2 image={wonkaImage} date="07 DIC. 2023" />
          </Grid>
      </Grid>

        </div>  
      );
};

export default Cartelera;