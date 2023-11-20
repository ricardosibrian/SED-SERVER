import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import hungerImage from '../assets/hunger.jpeg';
import marvelsImage from '../assets/marvels.jpg';
import wonkaImage from '../assets/wonka.jpeg';
import napoleonImage from '../assets/napoleon.jpg';

export default function MultiActionAreaCard2({ image, date }) {
  return (
    <Card sx={{ width: 200 , backgroundColor: '#7E8184'}}>
      <CardActionArea>
      <CardMedia
          component="img"
          height="240"
          image={image}
          alt={date} 
        />
        <CardContent >
          <Typography variant="body5" sx={{color: '#FFFFFF' }}> 
          {date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}