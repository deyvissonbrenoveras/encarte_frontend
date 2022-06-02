import React, { Suspense, lazy } from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import PrivilegeEnum from '../util/PrivilegeEnum';
import LoadingIcon from '../components/LoadingIcon';
// LAYOUTS
const MainLayout = lazy(() => import('../pages/layouts/MainLayout'));
const AuthLayout = lazy(() => import('../pages/layouts/AuthLayout'));
const DashboardLayout = lazy(() => import('../pages/layouts/DashboardLayout'));
const ShowcaseLayout = lazy(() => import('../pages/layouts/ShowcaseLayout'));

// MAIN
const IndexMain = lazy(() => import('../pages/main/Index'));
const StoresMain = lazy(() => import('../pages/main/Stores'));
// AUTH
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));

// DASHBOARD
const Dashboard = lazy(() => import('../pages/dashboard/DashboardIndex'));
const Stores = lazy(() => import('../pages/dashboard/Stores'));
const NewStore = lazy(() => import('../pages/dashboard/NewStore'));
const UpdateStore = lazy(() => import('../pages/dashboard/UpdateStore'));
const Users = lazy(() => import('../pages/dashboard/Users'));
const UpdateUser = lazy(() => import('../pages/dashboard/UpdateUser'));
const NewProduct = lazy(() => import('../pages/dashboard/NewProduct'));
const UpdateProduct = lazy(() => import('../pages/dashboard/UpdateProduct'));
const NewPartner = lazy(() => import('../pages/dashboard/NewPartner'));
const Partners = lazy(() => import('../pages/dashboard/Partners'));
const UpdatePartner = lazy(() => import('../pages/dashboard/UpdatePartner'));
const NewCategory = lazy(() => import('../pages/dashboard/NewCategory'));
const Categories = lazy(() => import('../pages/dashboard/Categories'));
const UpdateCategory = lazy(() => import('../pages/dashboard/UpdateCategory'));
const Products = lazy(() => import('../pages/dashboard/Products'));
const Logs = lazy(() => import('../pages/dashboard/Logs'));

// SHOWCASE
const Store = lazy(() => import('../pages/showcase/Store'));
const Product = lazy(() => import('../pages/showcase/Product'));
const Info = lazy(() => import('../pages/showcase/Info'));
const Partner = lazy(() => import('../pages/showcase/Partner'));
const Cart = lazy(() => import('../pages/showcase/Cart'));

function Routes() {
  return (
    <Suspense fallback={<LoadingIcon />}>
      <Switch>
        {/* MAIN */}
        <Route exact path="/" component={IndexMain} layout={MainLayout} />
        <Route exact path="/lojas" component={StoresMain} layout={MainLayout} />
        {/* AUTH */}
        <Route path="/login" component={Login} layout={AuthLayout} />
        <Route path="/signup" component={Signup} layout={AuthLayout} />

        {/* SHOWCASE */}
        <Route
          exact
          path="/loja/:url"
          component={Store}
          layout={ShowcaseLayout}
          showSearchBar
        />
        <Route
          path="/loja/:url/info"
          component={Info}
          layout={ShowcaseLayout}
        />
        <Route
          path="/loja/:url/produto/:productId"
          component={Product}
          layout={ShowcaseLayout}
        />
        <Route
          path="/loja/:url/parceiro/:partnerId"
          component={Partner}
          layout={ShowcaseLayout}
        />
        <Route
          path="/loja/:url/carrinho"
          component={Cart}
          layout={ShowcaseLayout}
        />

        {/* DASHBOARD */}
        <Route
          exact
          privilegeRequired={PrivilegeEnum.STORE_ADMINISTRATOR}
          path="/dashboard"
          component={Dashboard}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.SYSTEM_ADMINISTRATOR}
          path="/newstore"
          component={NewStore}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.STORE_ADMINISTRATOR}
          path="/stores"
          component={Stores}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.STORE_ADMINISTRATOR}
          path="/updatestore/:id"
          component={UpdateStore}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.SYSTEM_ADMINISTRATOR}
          path="/products"
          component={Products}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.STORE_ADMINISTRATOR}
          path="/newproduct"
          component={NewProduct}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.STORE_ADMINISTRATOR}
          path="/updateproduct/:id"
          component={UpdateProduct}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.STORE_ADMINISTRATOR}
          path="/newpartner"
          component={NewPartner}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.STORE_ADMINISTRATOR}
          path="/partners"
          component={Partners}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.STORE_ADMINISTRATOR}
          path="/updatepartner/:id"
          component={UpdatePartner}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.SYSTEM_ADMINISTRATOR}
          path="/newcategory"
          component={NewCategory}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.SYSTEM_ADMINISTRATOR}
          path="/updatecategory/:id"
          component={UpdateCategory}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.SYSTEM_ADMINISTRATOR}
          path="/categories"
          component={Categories}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.SYSTEM_ADMINISTRATOR}
          path="/users"
          component={Users}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.STORE_ADMINISTRATOR}
          path="/updateuser/:id"
          component={UpdateUser}
          layout={DashboardLayout}
        />
        <Route
          exact
          privilegeRequired={PrivilegeEnum.STORE_ADMINISTRATOR}
          path="/logs"
          component={Logs}
          layout={DashboardLayout}
        />
      </Switch>
    </Suspense>
  );
}

export default Routes;
