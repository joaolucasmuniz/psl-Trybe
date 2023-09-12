import { useContext, useEffect, useState } from 'react';
import calculateDaysSincePublication from '../../helpers/calculatedaysSincePublication';
import { CardProps } from '../../types/types';
import ContextStore from '../../context/context';

function Card(props : CardProps) {
  const { id, titulo, introducao, dataPublicacao, link } = props;
  const { favorites, setFavorites } = useContext(ContextStore);
  const [isFavorite, setIsFavorite] = useState(false);

  // Verifique o localStorage e defina o estado inicial com base nele
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorites(storedFavorites);
    setIsFavorite(storedFavorites.some((item: CardProps) => item.id === id));
  }, [id, setFavorites]);

  // Função para alternar o estado de favorito
  const handleFavorite = () => {
    let updatedFavorites: CardProps[] = [];

    if (isFavorite) {
      updatedFavorites = favorites.filter((item) => item.id !== id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, props];
      setIsFavorite(true);
    }

    // Atualize o localStorage com os favoritos atualizados
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    // Atualize o estado de favoritos
    setFavorites(updatedFavorites);
  };

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">{ titulo }</h5>
      </div>
      <div className="card-body">
        <p className="card-text">{ introducao }</p>
        <p
          className="card-text"
        >
          <small className="text-muted">
            { calculateDaysSincePublication(dataPublicacao) }
          </small>
        </p>
      </div>
      <div className="card-footer">
        <a href={ link } className="btn btn-primary" target="_blank" rel="noreferrer">
          <small className="text-muted">Leia a notícia aqui</small>
        </a>
        <button
          type="button"
          onClick={ () => handleFavorite() }
        >
          { isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}

        </button>
      </div>
    </div>
  );
}

export default Card;
