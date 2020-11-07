import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

// LAYOUTS
import AuthLayout from '../pages/layouts/AuthLayout';
import DashboardLayout from '../pages/layouts/DashboardLayout';
import ShowcaseLayout from '../pages/layouts/ShowcaseLayout';
// AUTH
import Login from '../pages/Login';
import Signup from '../pages/Signup';

// DASHBOARD
import Dashboard from '../pages/dashboard/DashboardIndex';
import Stores from '../pages/dashboard/Stores';
import NewStore from '../pages/dashboard/NewStore';
import UpdateStore from '../pages/dashboard/UpdateStore';
import Users from '../pages/dashboard/Users';
import UpdateUser from '../pages/dashboard/UpdateUser';
import NewProduct from '../pages/dashboard/NewProduct';
import UpdateProduct from '../pages/dashboard/UpdateProduct';
import NewPartner from '../pages/dashboard/NewPartner';
import Partners from '../pages/dashboard/Partners';
import UpdatePartner from '../pages/dashboard/UpdatePartner';
import NewCategory from '../pages/dashboard/NewCategory';
import Categories from '../pages/dashboard/Categories';
import UpdateCategory from '../pages/dashboard/UpdateCategory';
import Products from '../pages/dashboard/Products';

// SHOWCASE
import Store from '../pages/showcase/Store';
import Product from '../pages/showcase/Product';

function Routes() {
  return (
    <Switch>
      {/* AUTH */}
      <Route path="/login" component={Login} layout={AuthLayout} />
      <Route path="/signup" component={Signup} layout={AuthLayout} />

      {/* SHOWCASE */}
      <Route
        exact
        path="/loja/:url"
        component={Store}
        layout={ShowcaseLayout}
      />
      <Route
        path="/loja/:url/produto/:productId"
        component={Product}
        layout={ShowcaseLayout}
      />

      {/* DASHBOARD */}
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
        path="/products"
        component={Products}
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
        path="/newpartner"
        component={NewPartner}
        layout={DashboardLayout}
      />
      <Route
        exact
        isPrivate
        path="/partners"
        component={Partners}
        layout={DashboardLayout}
      />
      <Route
        exact
        isPrivate
        path="/updatepartner/:id"
        component={UpdatePartner}
        layout={DashboardLayout}
      />
      <Route
        exact
        isPrivate
        path="/newcategory"
        component={NewCategory}
        layout={DashboardLayout}
      />
      <Route
        exact
        isPrivate
        path="/updatecategory/:id"
        component={UpdateCategory}
        layout={DashboardLayout}
      />
      <Route
        exact
        isPrivate
        path="/categories"
        component={Categories}
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
