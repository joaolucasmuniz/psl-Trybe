import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/home';
import './App.css';
import Layout from './componentes/layout';
import ContextStore from './context/context';
import { CardProps, NewsInfo } from './types/types';

function App() {
  const [favorites, setFavorites] = useState<CardProps[]>([]);

  return (
    <ContextStore.Provider
      value={ {
        favorites,
        setFavorites,
      } }
    >

      <Routes>
        <Route element={ <Layout /> }>
          <Route path="/" element={ <Home /> } />
        </Route>
      </Routes>
    </ContextStore.Provider>
  );
}

export default App;
