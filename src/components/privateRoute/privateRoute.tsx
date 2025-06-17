import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Auth from '@/graphql/auth';

const PrivateRoute: React.FC = () => {
  const isAuthenticated = Auth.checkAuthCookie();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
