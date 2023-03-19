import React, { useState, useEffect } from 'react';
import { Autorization } from 'servicess/Api';
import { useAuth } from 'contexts/ContextProvider';
import { useNavigate } from 'react-router-dom';
import { NavItem } from './Layout.styled';
import {
  Container,
  Box,
  AppBar,
  Toolbar,
  Button,
  Typography,
} from '@mui/material';
import { useLocation, Outlet } from 'react-router-dom';

const navItems = [{ href: 'courses', text: 'All Courses' }];

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkHref = location.state?.from ?? '/courses';
  const { progress, token, setToken } = useAuth();
  const [message, setMessage] = useState('');
  const { courseId, order, position } = progress;

  useEffect(() => {
    if (token && location.pathname === '/') {
      navigate('/courses');
    }
  }, [location.pathname, navigate, token]);

  const handleLogin = () => {
    async function Auth() {
      setMessage('');
      try {
        const auth = await Autorization();
        if (auth === '') {
          setMessage('Something went wrong, try reloading the page');
          return;
        }
        setToken(auth.data.token);

        navigate('/courses');
      } catch {
        setMessage('Something went wrong, try reloading the page');
      }
    }
    Auth();
  };

  return (
    <Box>
      <AppBar position="static" sx={{ marginBottom: '30px' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                flexGrow: 1,
                gap: '20px',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {navItems.map(({ href, text }) => (
                <NavItem
                  key={href}
                  to={href}
                  ancor={href}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {text}
                </NavItem>
              ))}
              {courseId !== '' &&
                order !== '' &&
                position !== '' &&
                location.pathname === '/courses' && (
                  <NavItem
                    to={`/courses/${courseId}`}
                    state={{ from: backLinkHref }}
                  >
                    Last Watched Course
                  </NavItem>
                )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        {message && <p style={{ color: 'red', fontSize: '20px' }}>{message}</p>}
        {token === '' && (
          <Box>
            <Typography variant="h1">Welcome to Learning Planform</Typography>
            <Button variant="contained" size="large" onClick={handleLogin}>
              Get Started
            </Button>
          </Box>
        )}
      </Container>
      <Outlet />
    </Box>
  );
};

export default Layout;
