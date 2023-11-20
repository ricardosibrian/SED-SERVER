import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function MultiActionAreaCard({ image, title }) {
  return (
    <Card sx={{ width: 200 , backgroundColor: '#C03D3D'}}>
      <CardActionArea>
      <CardMedia
          component="img"
          height="240"
          image={image}
          alt={title} 
        />
        <CardContent >
          <Typography variant="body5" sx={{color: '#FFFFFF' }}> 
          {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}