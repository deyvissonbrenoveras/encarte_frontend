import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import { FaUser, FaStore, FaUserFriends, FaBoxOpen } from 'react-icons/fa';
// import { GiCheckboxTree } from 'react-icons/gi';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  AppBar,
  Toolbar,
  // Typography,
  Paper,
} from '@material-ui/core';
import { FaUser, FaUserFriends, FaBoxOpen } from 'react-icons/fa';
import { GiCheckboxTree } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai';
import { useTheme } from '@material-ui/core/styles';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  // Inbox,
  // Mail,
  ExitToApp,
} from '@material-ui/icons';
import PrivilegeEnum from '../../../util/PrivilegeEnum';

import logo from '../../../assets/logo.webp';
import useStyles from './styles';

import { signOut } from '../../../store/modules/auth/actions';

function DashboardLayout({ children }) {
  const profile = useSelector((state) => state.profile.profile);
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpened, setDrawerOpened] = useState(true);
  const handleDrawerOpen = () => {
    setDrawerOpened(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpened(false);
  };
  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: drawerOpened,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, drawerOpened && classes.hide)}
          >
            <Menu />
          </IconButton>
          <div className={classes.toolbarOptions}>
            <img src={logo} alt="logo" width={130} />
            <IconButton onClick={handleLogout}>
              <ExitToApp />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={drawerOpened}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeft className={classes.icon} />
            ) : (
              <ChevronRight />
            )}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.list}>
          <ListItem button component={Link} to="/dashboard">
            <ListItemIcon>
              <AiFillHome className={classes.list} />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button component={Link} to="/stores">
            <ListItemIcon>
              <FaBoxOpen className={classes.list} />
            </ListItemIcon>
            <ListItemText primary="Lojas" />
          </ListItem>

          {profile && profile.privilege < PrivilegeEnum.STORE_ADMINISTRATOR && (
            <ListItem button component={Link} to="/products">
              <ListItemIcon>
                <FaBoxOpen className={classes.list} />
              </ListItemIcon>
              <ListItemText primary="Produtos" />
            </ListItem>
          )}

          {profile && profile.privilege < PrivilegeEnum.STORE_ADMINISTRATOR && (
            <ListItem button component={Link} to="/partners">
              <ListItemIcon>
                <FaUserFriends className={classes.list} />
              </ListItemIcon>
              <ListItemText primary="Parceiros" />
            </ListItem>
          )}

          {profile && profile.privilege < PrivilegeEnum.STORE_ADMINISTRATOR && (
            <ListItem button component={Link} to="/categories">
              <ListItemIcon>
                <GiCheckboxTree className={classes.list} />
              </ListItemIcon>
              <ListItemText primary="Categorias" />
            </ListItem>
          )}

          {profile && profile.privilege < PrivilegeEnum.STORE_ADMINISTRATOR && (
            <ListItem button component={Link} to="/users">
              <ListItemIcon>
                <FaUser className={classes.list} />
              </ListItemIcon>
              <ListItemText primary="Usuários" />
            </ListItem>
          )}
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: drawerOpened,
        })}
      >
        <div className={classes.drawerHeader} />
        <Paper elevation={3}>{children}</Paper>
      </main>
    </div>
  );
}

export default DashboardLayout;

DashboardLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
