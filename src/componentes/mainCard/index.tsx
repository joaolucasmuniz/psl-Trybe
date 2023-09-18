import { useContext, useEffect, useState } from 'react';
import calculateDaysSincePublication from '../../helpers/calculatedaysSincePublication';
import { CardProps, ImagesApi } from '../../types/types';
import ContextStore from '../../context/context';
import styles from './mainCard.module.css';

import heartIcon from '../../images/heart-thin-icon.svg';
import redHeart from '../../images/red-heart-icon.svg';

function MainCard(props : CardProps) {
  const { id, titulo, introducao, dataPublicacao, link, imagens } = props;
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

  const generateApiImage = () => {
    const baseUrl = 'https://agenciadenoticias.ibge.gov.br/';
    const imagesjson: ImagesApi = JSON.parse(imagens as string);
    const image = `${baseUrl}${imagesjson.image_intro}`;
    return image;
  };

  return (
    <section className={ styles.mainCardContainer }>
      <img
        className={ styles.newsImage }
        src={ generateApiImage() }
        alt="imagem da noticia"
      />
      <div className={ styles.card }>
        <div className={ styles.cardHeader }>
          <span> Notícia mais recente </span>
          <h4 className="card-title">{ titulo }</h4>
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
              ? <img data-testid="mainCardRedHeart" src={ redHeart } alt="red heart" />
              : <img data-testid="mainCardHeart" src={ heartIcon } alt="heart icon" />}
          </button>
        </div>
      </div>
    </section>
  );
}

export default MainCard;
