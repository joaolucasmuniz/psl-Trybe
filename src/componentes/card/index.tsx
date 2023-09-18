import { useContext, useEffect, useState } from 'react';
import calculateDaysSincePublication from '../../helpers/calculatedaysSincePublication';
import { CardProps } from '../../types/types';
import ContextStore from '../../context/context';
import redHeart from '../../images/red-heart-icon.svg';
import herartIcon from '../../images/heart-thin-icon.svg';

import styles from './card.module.css';

function Card(props : CardProps) {
  const { id, titulo, introducao, dataPublicacao, link, type } = props;
  const { favorites, setFavorites } = useContext(ContextStore);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
    setIsFavorite(storedFavorites.some((item: CardProps) => item.id === id));
  }, [id, setFavorites]);

  const handleFavorite = () => {
    let updatedFavorites: CardProps[] = [];

    if (isFavorite) {
      updatedFavorites = favorites.filter((item) => item.id !== id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, props];
      setIsFavorite(true);
    }
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    setFavorites(updatedFavorites);
  };

  return (
    <div data-testid={ `card-${type}` } className={ styles.card }>
      <div className={ styles.cardHeader }>
        <h4 data-testid="cardTitle" className="card-title">{ titulo }</h4>
      </div>
      <div className={ styles.cardBody }>
        <p className="card-text">{ introducao }</p>

        <div className={ styles.cardMoreInfo }>
          <span>
            { calculateDaysSincePublication(dataPublicacao) }
          </span>
          <a href={ link } target="_blank" rel="noreferrer">
            Leia a notícia aqui
          </a>
        </div>

      </div>
      <div className={ styles.cardFooter }>
        <button
          type="button"
          onClick={ () => handleFavorite() }
        >
          { isFavorite
            ? <img src={ redHeart } alt="red heart" />
            : <img src={ herartIcon } alt="heart icon" />}
        </button>
      </div>
    </div>
  );
}

export default Card;
