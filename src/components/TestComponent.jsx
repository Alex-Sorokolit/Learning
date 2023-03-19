import React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TestComponent = () => {
  return (
    <div>
      <Button
        variant="contained"
        sx={{
          color: 'white',
          '&:hover': { backgroundColor: 'red' },
        }}
      >
        myFirst Button <DeleteIcon />
      </Button>
    </div>
  );
};

export default TestComponent;
