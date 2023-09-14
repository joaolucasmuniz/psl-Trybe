import { useContext } from 'react';
import ContextStore from '../../context/context';
import Card from '../card';

function Favorites() {
  const { favorites } = useContext(ContextStore);

  return (
    <section>
      <section>
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
      </section>
    </section>
  );
}

export default Favorites;
