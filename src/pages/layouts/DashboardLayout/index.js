import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { FaUser, FaStore, FaUserFriends, FaBoxOpen } from 'react-icons/fa';
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

import logo from '../../../assets/logo.png';
import useStyles from './styles';

import { signOut } from '../../../store/modules/auth/actions';

function DashboardLayout({ children }) {
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

          <ListItem button component={Link} to="/newstore">
            <ListItemIcon>
              <FaStore className={classes.list} />
            </ListItemIcon>
            <ListItemText primary="Nova Loja" />
          </ListItem>

          <ListItem button component={Link} to="/stores">
            <ListItemIcon>
              <FaBoxOpen className={classes.list} />
            </ListItemIcon>
            <ListItemText primary="Lojas" />
          </ListItem>

          <ListItem button component={Link} to="/newproduct">
            <ListItemIcon>
              <FaBoxOpen className={classes.list} />
            </ListItemIcon>
            <ListItemText primary="Novo produto" />
          </ListItem>

          <ListItem button component={Link} to="/newpartner">
            <ListItemIcon>
              <FaUserFriends className={classes.list} />
            </ListItemIcon>
            <ListItemText primary="Novo parceiro" />
          </ListItem>

          <ListItem button component={Link} to="/partners">
            <ListItemIcon>
              <FaUserFriends className={classes.list} />
            </ListItemIcon>
            <ListItemText primary="Parceiros" />
          </ListItem>

          <ListItem button component={Link} to="/newcategory">
            <ListItemIcon>
              <GiCheckboxTree className={classes.list} />
            </ListItemIcon>
            <ListItemText primary="Nova categoria" />
          </ListItem>

          <ListItem button component={Link} to="/categories">
            <ListItemIcon>
              <GiCheckboxTree className={classes.list} />
            </ListItemIcon>
            <ListItemText primary="Categorias" />
          </ListItem>

          <ListItem button component={Link} to="/users">
            <ListItemIcon>
              <FaUser className={classes.list} />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </ListItem>
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
