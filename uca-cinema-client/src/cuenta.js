import * as React from 'react';
import Typography from '@mui/material/Typography';
import Fields from './components/fields';

const Cuenta = () => {
   

    return (
        <div>     
          <Typography variant="h5" align="center" sx={{  marginLeft: '20px', marginTop: '10px', marginBottom: '10px', color: '#EBB401', fontWeight: 'bold' }}>
            CONFIGURACIÓN DE CUENTA
          </Typography> 
          <div align="center">   
            <Fields />
          </div>  
        
        </div>  
      );
};

export default Cuenta;