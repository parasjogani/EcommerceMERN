import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PageAuth = (WrappedComponent) => {
  const HOCComponent = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('user');
      if (!token) {
        navigate('/');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return HOCComponent;
};

export default PageAuth;
