import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ size = 'md' }) => {
  const sizes = {
    sm: 'sm',
    md: 'md',
    lg: 'lg'
  };

  return (
    <div className="text-center py-5">
      <Spinner 
        animation="border" 
        variant="success" 
        size={sizes[size] === 'lg' ? undefined : sizes[size]}
        style={size === 'lg' ? { width: '3rem', height: '3rem' } : {}}
      />
    </div>
  );
};

export default Loader;