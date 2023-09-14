import { useState } from 'react';
import { ChevronRightOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Button, Divider, Hidden, IconButton,
  List, ListItem, SwipeableDrawer, Toolbar, Typography } from '@mui/material';

type NavBarProps = {
  setCurrentNav: (nav: string) => void;
};
function NavBar(props: NavBarProps) {
  const { setCurrentNav } = props;
  const [open, setOpen] = useState(false);

  const navigation = [
    {
      name: 'Mais recentes', id: 'all',
    },
    {
      name: 'Realease', id: 'Release',
    },
    {
      name: 'Notícias', id: 'Notícias',
    },
    {
      name: 'Favoritas', id: 'Favoritas',
    },
  ];

  return (
    <AppBar color="default" position="static">
      <Toolbar>
        <Hidden smDown>
          {navigation.map((item) => (
            <Button
              key={ item.id }
              onClick={ () => setCurrentNav(item.id) }
              color="inherit"
            >
              {item.name}
            </Button>
          ))}
        </Hidden>

        <Hidden smUp>
          <Button color="inherit" onClick={ () => setOpen(true) }>
            <MenuOutlined />
            <Typography>
              filtrar categorias
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

        <IconButton onClick={ () => setOpen(false) }>
          <ChevronRightOutlined />
        </IconButton>

        <Divider />

        <List>
          {navigation.map((item) => (
            <ListItem key={ item.id }>
              <Button
                onClick={ () => setCurrentNav(item.id) }
                color="inherit"
              >
                {item.name}
              </Button>
            </ListItem>
          ))}
        </List>

      </SwipeableDrawer>

    </AppBar>
  );
}

export default NavBar;
