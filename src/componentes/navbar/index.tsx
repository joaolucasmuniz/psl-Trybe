import { useState } from 'react';
import { ChevronLeftOutlined, MenuOutlined } from '@mui/icons-material';
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
          <div style={ { flex: 1 } }>
            {navigation.map((item) => (
              <Button
                key={ item.id }
                onClick={ () => setCurrentNav(item.id) }
                color="inherit"
              >
                {item.name}
              </Button>
            ))}
          </div>
          <MenuOutlined />
        </Hidden>

        <Hidden smUp>
          <Button color="inherit" onClick={ () => setOpen(true) }>
            <MenuOutlined />
            <Typography marginLeft="1.2rem">
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
                onClick={ () => {
                  setCurrentNav(item.id);
                  setOpen(false);
                } }
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
