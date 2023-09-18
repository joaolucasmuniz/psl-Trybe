import { useState } from 'react';
import { ChevronLeftOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Button, Divider, Hidden, IconButton,
  List, ListItem, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import styles from './navbar.module.css';

type NavBarProps = {
  setCurrentNav: (nav: string) => void;
  currentNav: string;
};
function NavBar(props: NavBarProps) {
  const { setCurrentNav, currentNav } = props;
  const [open, setOpen] = useState(false);

  const navigation = [
    {
      id: 'Mais recentes',
    },
    {
      id: 'Release',
    },
    {
      id: 'Notícias',
    },
    {
      id: 'Favoritas',
    },
  ];

  return (
    <AppBar data-testid="navbar" color="default" position="static">
      <Toolbar>
        <Hidden smDown>
          <div style={ { flex: 1 } }>
            {navigation.map((item) => (
              <Button
                className={ `${styles.navButton} 
              ${currentNav === item.id ? styles.active : ''}` }
                data-testid={ `${item.id}-category-filter` }
                key={ item.id }
                onClick={ () => setCurrentNav(item.id) }
                color="inherit"
              >
                {item.id}
              </Button>
            ))}
          </div>
          <MenuOutlined />
        </Hidden>

        <Hidden smUp>
          <Button color="inherit" onClick={ () => setOpen(true) }>
            <MenuOutlined />
            <Typography marginLeft="1.2rem">
              {currentNav}
            </Typography>
          </Button>
        </Hidden>
      </Toolbar>

      <SwipeableDrawer
        anchor="left"
        open={ open }
        onOpen={ () => setOpen(true) }
        onClose={ () => setOpen(false) }
      >
        <div style={ { display: 'flex', justifyContent: 'flex-end' } }>
          <IconButton onClick={ () => setOpen(false) }>
            <ChevronLeftOutlined />
          </IconButton>
        </div>
        <Divider />

        <List
          sx={
          {
            width: 250,
          }
        }
        >
          {navigation.map((item) => (
            <ListItem key={ item.id }>
              <Button
                className={ `${styles.navButton} 
                ${currentNav === item.id ? styles.botaoAtivo : ''}` }
                data-testid={ `${item.id}-category-filter` }
                onClick={ () => {
                  setCurrentNav(item.id);
                  setOpen(false);
                } }
                color="inherit"
              >
                {item.id}

              </Button>
            </ListItem>
          ))}
        </List>

      </SwipeableDrawer>

    </AppBar>
  );
}

export default NavBar;
