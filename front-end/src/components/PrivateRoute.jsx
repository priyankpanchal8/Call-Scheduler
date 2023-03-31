import React, { Component } from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ isAuthenticated: isAuthenticated, ...rest }) => {
  let rendering = null;

  if (!isAuthenticated)
  {
    return (<Navigate to='/Login' />);
  }
  else
  {
    return <Outlet {...rest} />
  }

}

export default PrivateRoute