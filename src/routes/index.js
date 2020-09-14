import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import AuthLayout from '../pages/layouts/authLayout';

import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import Signup from '../pages/signup';

function Routes() {
  return (
    <Switch>
      <Route isPrivate path="/dashboard" component={Dashboard} />

      <AuthLayout>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </AuthLayout>
    </Switch>
  );
}

export default Routes;
