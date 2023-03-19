import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getCourse } from 'servicess/Api';
import ReactPlayer from 'react-player';
import { Container, Stack, Typography, Box, Paper, Chip } from '@mui/material';
import PlayList from 'components/PlayList';
import { useAuth } from 'contexts/ContextProvider';
import CourseSkeleton from 'components/CourseSkeleton';
import { GoBackBtn } from 'components/Course.styled';

const Course = () => {
  const location = useLocation();
  const { courseId } = useParams();
  const backLinkHref = location.state?.from ?? '/courses';
  const { token, setProgress } = useAuth();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState(null);
  const [order, setOrder] = useState(1);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    async function Fetch() {
      setIsLoading(true);
      setMessage('');
      try {
        const courseData = await getCourse(courseId, token);

        setCourse(courseData);
        setVideoUrl(courseData.lessons[0].link);
        const preview = `${courseData.lessons[0].previewImageLink}/lesson-${courseData.lessons[0].order}.webp`;
        setThumbnail(preview);
        setVideoTitle(courseData.lessons[0].title);
      } catch {
        setMessage('Something went wrong, try reloading the page');
      } finally {
        setIsLoading(false);
      }
    }
    if (courseId) {
      Fetch();
    }
  }, [courseId, token]);

  const storeVideoProgress = position => {
    const wachedVideo = {
      courseId,
      order,
      position,
    };
    setProgress(wachedVideo);
  };

  return (
    <Container>
      {message && <p style={{ color: 'red', fontSize: '20px' }}>{message}</p>}
      <GoBackBtn to={backLinkHref}>Go Back</GoBackBtn>
      {isLoading && <CourseSkeleton style={{ paddingLeft: '20px' }} />}
      {course && !isLoading && (
        <Container>
          <Stack direction="row" spacing={2}>
            <PlayList
              courseId={course.id}
              lessons={course.lessons}
              setOrder={setOrder}
              videoUrl={videoUrl}
              setUrl={setVideoUrl}
              setThumbnail={setThumbnail}
              setVideoTitle={setVideoTitle}
            ></PlayList>

            <Box>
              <Paper elevation={3}>
                <Typography
                  variant="h4"
                  component={'h1'}
                  sx={{ color: '#000', padding: '30px' }}
                >
                  {course.title}
                </Typography>
                {videoUrl && (
                  <Typography
                    variant="h5"
                    component={'p'}
                    sx={{
                      color: '#000',
                      margitBottom: '10px',
                      marginLeft: '30px',
                    }}
                  >
                    {videoTitle}
                  </Typography>
                )}

                {videoUrl && (
                  <ReactPlayer
                    url={videoUrl}
                    width="640"
                    controls
                    light={thumbnail}
                    onProgress={({ playedSeconds }) =>
                      storeVideoProgress(playedSeconds)
                    }
                  ></ReactPlayer>
                )}
                <Box sx={{ padding: '30px' }}>
                  <Typography
                    variant="h5"
                    component={'h2'}
                    sx={{ color: '#000', marginBottom: '20px' }}
                  >
                    About this course
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#000',
                      marginBottom: '20px',
                      marginLeft: '20px',
                    }}
                  >
                    {course.description}
                  </Typography>
                  <Box>
                    <Typography
                      variant="h6"
                      component={'p'}
                      sx={{ color: '#000', marginBottom: '20px' }}
                    >
                      Tags:
                    </Typography>
                    {course.tags &&
                      course.tags.map((tad, index) => (
                        <span key={index}>
                          <Chip label={tad} size="smal" />
                        </span>
                      ))}
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Stack>
        </Container>
      )}
    </Container>
  );
};

export default Course;
