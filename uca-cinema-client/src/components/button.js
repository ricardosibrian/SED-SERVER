import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ message, color, onClick }) => {
  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      sx={{
        borderRadius: '20px',
        border: `1px solid ${color}`,
        backgroundColor: color,
        color: '#ffffff',
        fontSize: '12px',
        fontWeight: 'bold',
        marginLeft: '5px',
        padding: '12px 45px',
        textTransform: 'uppercase',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: color, // Mantenemos el fondo igual al color original
        },
      }}
      onClick={handleButtonClick}
    >
      {message}
    </Button>
  );
};

export default CustomButton;

