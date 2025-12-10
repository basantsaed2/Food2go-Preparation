import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/Auth';

const ProtectedLogin = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const preparation = auth.preparation;

  useEffect(() => {
    if (preparation && location.pathname === '/login') {
      navigate('/', { replace: true });
    } else if (!preparation && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [preparation, location.pathname, navigate]);

  return <Outlet />;
};

export default ProtectedLogin;