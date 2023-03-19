import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCourses } from 'servicess/Api';
import { Container, Pagination } from '@mui/material';
import CardCourse from 'components/CardCourse';
import { useAuth } from 'contexts/ContextProvider';
import { Item, List } from './Courses.styled';

const Courses = () => {
  const location = useLocation();
  const { token } = useAuth();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [allCourses, setAllCourses] = useState([]); // all data
  const [courses, setCourses] = useState([]); // data for one page]
  const [totalPages, setTotalPages] = useState(null);
  const [page, setPage] = useState(1); // page number

  // Get Courses Data
  useEffect(() => {
    async function Fetch(token) {
      setIsLoading(true);

      setMessage('');
      try {
        const coursesData = await getCourses(token);

        if (coursesData.length === 0) {
          setMessage('Something went wrong, try reloading the page');
          return;
        }

        setAllCourses(coursesData);
      } catch (error) {
        setMessage('Something went wrong, try reloading the page');
      } finally {
        setIsLoading(false);
      }
    }
    if (token !== '') {
      Fetch(token);
    }
  }, [token]);

  useEffect(() => {}, [isLoading]);

  // Pagination
  useEffect(() => {
    setTotalPages(Math.ceil(allCourses.length / 10));
    const count = 10 * page - 10;
    const end = page === 1 ? allCourses.length : allCourses.length - count;
    const start = end - 10 >= 0 ? end - 10 : 0;
    setCourses(allCourses.slice(start, end));
  }, [allCourses, page]);

  if (allCourses.length === 0) {
    return null;
  }

  return (
    <>
      {isLoading && <p style={{ color: '20px' }}>Loading...</p>}

      <Container>
        {courses && !isLoading && (
          <Container>
            <List
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="stretch"
            >
              {courses.map(
                ({
                  id,
                  title,
                  previewImageLink,
                  lessonsCount,
                  rating,
                  description,
                  skills,
                  courseVideoPreview,
                }) => (
                  <Item key={id}>
                    <Link to={`${id}`} state={{ from: location }}>
                      <CardCourse
                        title={title}
                        previewImageLink={previewImageLink}
                        lessonsCount={lessonsCount}
                        rating={rating}
                        description={description}
                        skills={skills}
                        courseVideoPreview={courseVideoPreview}
                      />
                    </Link>
                  </Item>
                )
              )}
            </List>
            {totalPages && (
              <div>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, num) => setPage(num)}
                  shape="rounded"
                  variant="outlined"
                  size="large"
                  color="primary"
                  showFirstButton
                  showLastButton
                  hidePrevButton
                  hideNextButton
                  sx={{ marginBottom: '30px' }}
                />
              </div>
            )}
          </Container>
        )}
        {message && <p style={{ color: 'red', fontSize: '20px' }}>{message}</p>}
      </Container>
    </>
  );
};

export default Courses;
