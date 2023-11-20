import * as React from 'react';
import Typography from '@mui/material/Typography';
import Table from './components/table';

const Usuario = () => {
    
    return (
        <div>
            <Typography variant="h5" align="center" sx={{ marginLeft: '20px', marginTop: '10px', marginBottom: '10px', color: '#EBB401', fontWeight: 'bold' }}>
                USUARIOS
            </Typography>
            <div style={{ border: '1px solid #000', padding: '5px', background: '#fff' }}>
                <Table />
            </div>
        </div>
    );
};

export default Usuario;
