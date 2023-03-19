import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import { Courses, Course } from 'pages';

export const App = () => {
  return (
    <React.Fragment>
      <CssBaseline enableColorScheme />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<Course />} />
        </Route>
        <Route path="*" element={<Navigate to="/courses" />} />
      </Routes>
    </React.Fragment>
  );
};
