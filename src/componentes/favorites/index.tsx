import { useContext } from 'react';
import ContextStore from '../../context/context';
import Card from '../card';
import nofav from '../../images/noFav.jpg';

import styles from '../news/news.module.css';

function Favorites() {
  const { favorites } = useContext(ContextStore);

  if (favorites.length === 0) {
    return (
      <div className={ styles.noFavoriteContainer }>
        <p className={ styles.noFavorites }>Você não possui favoritos</p>
        <img src={ nofav } alt="nenhuma noticia encontrada" />
        <a href="https://br.freepik.com/vetores-gratis/nenhuma-ilustracao-do-conceito-de-dados_5928292.htm#query=no%20favorites&position=24&from_view=search&track=ais">Imagem de storyset</a>
        {' '}
        no Freepik

      </div>
    );
  }

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
