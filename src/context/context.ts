import { createContext } from 'react';
import { CardProps } from '../types/types';

type Context = {
  favorites: CardProps[];
  setFavorites: (favorites: any) => void;
};

const ContextStore = createContext({} as Context);

export default ContextStore;
