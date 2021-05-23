import React, { Component } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import { logout, getToken } from "../../services/auth";
import axios from "axios"

import Logo from "../../assets/Logo1.png";
import api from "../../services/api";

import clsx from 'clsx';
import { makeStyles, useTheme, createMuiTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

import MUIDataTable from "mui-datatables";

const drawerWidth = 240;

const columns = [
  {
   name: "name",
   label: "Nome",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "email",
   label: "Email",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "financialBalance",
   label: "Valor",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
    name: "clientSince",
    label: "Cliente Desde",
    options: {
     filter: true,
     sort: true,
    }
   },
 ];

const options = {
  filterType: 'multiselect',
};

const theme = createMuiTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    neutral: {
      main: '#5c6ac4',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  exitButton: {
    marginRight: 36,
    position: 'right',
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  linkButton: {
    textDecoration: 'none',
    color: theme.palette.background.default
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [data, setData] = React.useState([])

  console.log(props.departamento)

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleActive = () => {
    handleData();
    setActive(!active);
  };

  const handleData = async () => {
    const token = getToken();
    const response = await api.get("/clients", {
      headers: {
        'Authorization': `Basic ${token}` 
      }});

    setData(response.data)

    console.log(response)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Menu
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {props.departamento === 'financeiro' ?
          <ListItem button onClick={handleActive} key={"Relatório"}>
            <ListItemIcon>
              <AccountBalanceIcon/>
            </ListItemIcon>
            <ListItemText primary={"Relatório"} />
          </ListItem>
          :
          <></>
          }
          <Divider />
          <Link to="/" onClick={logout} className={classes.link}>
            <ListItem button key={"Sair"} onClick={logout}>
              <ListItemIcon>
                  <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary={"Sair"} />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        { active ?
        <MUIDataTable
          title={"Clientes Inadimplentes"}
          data={data}
          columns={columns}
          options={options}
        />
        :
        null
        }
      </main>
    </div>
  );
}