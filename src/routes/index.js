import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import AuthLayout from '../pages/layouts/AuthLayout';
import DashboardLayout from '../pages/layouts/DashboardLayout';

import Login from '../pages/Login';
import Dashboard from '../pages/dashboard/DashboardIndex';
import Signup from '../pages/Signup';
import Stores from '../pages/dashboard/Stores';
import NewStore from '../pages/dashboard/NewStore';
import UpdateStore from '../pages/dashboard/UpdateStore';
import Users from '../pages/dashboard/Users';
import UpdateUser from '../pages/dashboard/UpdateUser';
import NewProduct from '../pages/dashboard/NewProduct';
import UpdateProduct from '../pages/dashboard/UpdateProduct';

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
        path="/newstore"
        component={NewStore}
        layout={DashboardLayout}
      />
      <Route
        exact
        isPrivate
        path="/stores"
        component={Stores}
        layout={DashboardLayout}
      />
      <Route
        exact
        isPrivate
        path="/updatestore/:id"
        component={UpdateStore}
        layout={DashboardLayout}
      />
      <Route
        exact
        isPrivate
        path="/newproduct"
        component={NewProduct}
        layout={DashboardLayout}
      />
      <Route
        exact
        isPrivate
        path="/updateproduct/:id"
        component={UpdateProduct}
        layout={DashboardLayout}
      />
      <Route
        exact
        isPrivate
        path="/users"
        component={Users}
        layout={DashboardLayout}
      />
      <Route
        exact
        isPrivate
        path="/updateuser/:id"
        component={UpdateUser}
        layout={DashboardLayout}
      />
    </Switch>
  );
}

export default Routes;
