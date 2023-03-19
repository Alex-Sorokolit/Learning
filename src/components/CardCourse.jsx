import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Box,
  Chip,
} from '@mui/material';
import React from 'react';

const CardCourse = props => {
  const { title, previewImageLink, lessonsCount, rating, description, skills } =
    props;

  return (
    <Card elevation={3} sx={{ maxWidth: '700px', padding: '20px' }}>
      <CardMedia
        component="img"
        image={`${previewImageLink}/cover.webp`}
        alt="preview"
      ></CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component="span">
          Lessons: {lessonsCount}
        </Button>
        <Button size="small" component="span">
          Rating: {rating}
        </Button>
      </CardActions>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {skills &&
          skills.map((skill, index) => (
            <span key={index}>
              <Chip variant="outlined" label={skill} size="smal" />
            </span>
          ))}
      </Box>
    </Card>
  );
};

export default CardCourse;
