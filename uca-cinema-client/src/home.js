import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MovieIcon from '@mui/icons-material/Movie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CarteleraComponent from './cartelera';
import CuentaComponent from './cuenta';
import Login from './Login/login';
import UsuariosComponent from './usuario';
import FormDialog from './createForm';
import axios from 'axios';
import User from './assets/default_user.png'; 

const drawerWidth = 220;

export default function PermanentDrawerLeft() {
  const [selectedComponent, setSelectedComponent] = useState(<CarteleraComponent />);
  const navigate  = useNavigate ();
  const [userRole, setUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [isFormDialogVisible, setFormDialogVisible] = useState(true);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    const fetchUserRole = async () => {
      try {
        const response = await axios.get('/api/auth/whoami', {
          headers: {
            authorization: `Bearer ${authToken}`
          }
        });
        setUserRole(response.data.rol);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: '#3C3C40',
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          height:`70px`,
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          backgroundColor: '#851616',
          top: 0
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            UCA CINEMA
          </Typography>
  
          <Box sx={{ marginLeft: 'auto', marginTop: '5px' }}>
            { userRole === 'user' ?
                <> 
                <div></div>
                </>:
                <><FormDialog />
                </>
            }
          </Box>
    
        </Toolbar>
        
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#EFEDED',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
          <img src={User} alt="Imagen" style={{ width: '100%', maxWidth: '100px', borderRadius: '50%' }} />
          <Typography variant="caption" color="textSecondary" mt={1} fontWeight='bold' >
          {email} 
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {userRole} 
          </Typography>
        </Box>

        <Divider />
        <List>
        {['Cartelera', 'Cuenta', 'Usuarios'].map((text, index) => (
          // Oculta el botón 'Usuarios' si el rol es 'user'
          !(userRole === 'user' && text === 'Usuarios') && (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleComponentChange(text)}>
                <ListItemIcon>
                  {index === 0 ? <MovieIcon /> : index === 1 ? <AccountCircleIcon /> : <GroupIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        ))}
      </List>
        <Divider />
        <List>
          {['Cerrar sesión'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleComponentChange(text)}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          backgroundColor: '#3C3C40',
          p: 3,
          marginTop: `10px`, // Ajusta el margen superior según tu preferencia
          marginBottom: `0px`, // Ajusta el margen superior según tu preferencia
          position: "fixed",
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          maxHeight: 'calc(100vh - 10px - 2px)', // Resta la altura del AppBar y el margen superior
          overflow: 'auto' // Permite el desplazamiento
        }}
      >
        <Box sx={{ padding:'20px', marginTop: '30px', backgroundColor: '#1C1C1F' }}>
          {selectedComponent}
        </Box>
      </Box>
    </Box>
  );

  function handleComponentChange(selected) {
    if (selected === 'Cartelera') {
      setSelectedComponent(<CarteleraComponent />);
    } else if (selected === 'Cuenta') {
      setSelectedComponent(<CuentaComponent />);
    } else if (selected === 'Usuarios') {
      setSelectedComponent(<UsuariosComponent />);
    }
    else if (selected === 'Cerrar sesión') {
      // Limpiar el token y redirigir a la pantalla de inicio de sesión
      localStorage.removeItem("authToken");
      //alert("Inicio de sesión exitoso");
      navigate('/');  // Redirige a la pantalla de inicio de sesión
    }
  }
}