import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import AuthLayout from '../pages/layouts/authLayout';
import DashboardLayout from '../pages/layouts/dashboardLayout';

import Login from '../pages/login';
import Dashboard from '../pages/dashboard/dashboardIndex';
import Signup from '../pages/signup';
import Stores from '../pages/dashboard/stores';

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={Login} layout={AuthLayout} />
      <Route path="/signup" component={Signup} layout={AuthLayout} />

      <Route
        exact
        isPrivate
        path="/dashboard"
        component={Dashboard}
        layout={DashboardLayout}
      />
      <Route
        exact
        isPrivate
        path="/lojas"
        component={Stores}
        layout={DashboardLayout}
      />
    </Switch>
  );
}

export default Routes;
