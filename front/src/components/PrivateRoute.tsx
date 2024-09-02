import React from 'react';
import { Route, Navigate, RouteProps, Outlet } from 'react-router-dom';

interface PrivateRouteProps  {
  condition: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ condition }) => {
    return condition ? <Outlet /> : <Navigate to="/home" />;
  };
  
export default PrivateRoute;
