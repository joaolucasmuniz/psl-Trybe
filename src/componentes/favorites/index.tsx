import { useContext } from 'react';
import ContextStore from '../../context/context';
import Card from '../card';

import styles from '../news/news.module.css';

function Favorites() {
  const { favorites } = useContext(ContextStore);

  return (
    <div className={ styles.newsContainer }>
      {favorites.map((item, index) => (
        <Card
          id={ item.id }
          key={ index }
          titulo={ item.titulo }
          introducao={ item.introducao }
          dataPublicacao={ item.dataPublicacao }
          link={ item.link }
        />
      ))}
    </div>

  );
}

export default Favorites;
