import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Auth from '@/graphql/auth';

const AdminRoute: React.FC = () => {
  const isAdmin = Auth.hasRole('admin');

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute;
