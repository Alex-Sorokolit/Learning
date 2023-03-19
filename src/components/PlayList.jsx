import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Card,
  Accordion,
  AccordionSummary,
} from '@mui/material';
import React from 'react';

const PlayList = ({
  lessons,
  videoUrl,
  setUrl,
  setThumbnail,
  setVideoTitle,
  setOrder,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleChange =
    (panel, url, previewImageLink, order, videoTitle) =>
    (event, newExpanded) => {
      setActiveStep(newExpanded ? panel : false);
      setUrl(url);
      setThumbnail(`${previewImageLink}/lesson-${order}.webp`);
      setVideoTitle(videoTitle);
      setOrder(order);
    };

  return (
    <Card style={{ display: 'flex', alignItems: 'start' }}>
      <Stepper
        orientation="vertical"
        activeStep={activeStep}
        sx={{ paddingTop: '8px' }}
      >
        {lessons.len !== 0 &&
          lessons.map((lesson, index) => (
            <Step key={lesson.id}>
              <StepLabel></StepLabel>
            </Step>
          ))}
      </Stepper>
      <div>
        {lessons.length !== 0 &&
          lessons.map((lesson, index) => (
            <Accordion
              expanded={activeStep === index}
              onChange={handleChange(
                index,
                lesson.link,
                lesson.previewImageLink,
                lesson.order,
                lesson.title
              )}
              key={lesson.id}
              disabled={lesson.status !== 'unlocked' || !videoUrl}
              sx={{ padding: '8px 0 ' }}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>{lesson.title}</Typography>
              </AccordionSummary>
            </Accordion>
          ))}
      </div>
    </Card>
  );
};

export default PlayList;
