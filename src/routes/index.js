import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import Signup from '../pages/signup';

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route isPrivate path="/dashboard" component={Dashboard} />
      <Route path="/signup" component={Signup} />
    </Switch>
  );
}

export default Routes;
