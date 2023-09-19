import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Card from '../card';
import fetchApi from '../../helpers/fetchApi';
import { NewsInfo } from '../../types/types';

import styles from './news.module.css';

type NewsProps = {
  type: string;
};

function News(props: NewsProps) {
  const { type = 'all' } = props;
  const [news, setNews] = useState<NewsInfo[]>([]);
  const [page, setPage] = useState(1);

  const apiUrls = {
    all: 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10',
    news: 'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=10',
    release: 'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release&qtd=10',
  };

  useEffect(() => {
    const initialFetch = async () => {
      const data = await fetchApi(apiUrls[type as keyof typeof apiUrls]);
      setNews(data.items);
    };
    initialFetch();
  }, []);

  const handleClick = async () => {
    try {
      const data = await fetchApi(
        `${apiUrls[type as keyof typeof apiUrls]}&page=${page + 1}`,
      );
      setNews([...news, ...data.items]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={ styles.newsContainer }>
        {news.map((item, index) => (
          <Card
            type={ type }
            id={ item.id }
            key={ index }
            titulo={ item.titulo }
            introducao={ item.introducao }
            dataPublicacao={ item.data_publicacao }
            link={ item.link }
          />
        ))}
      </div>
      <Button
        data-testid="btnSeeMore"
        variant="outlined"
        color="error"
        className={ styles.buttonSeeMore }
        onClick={ () => handleClick() }
      >
        ver mais
      </Button>
    </>
  );
}

export default News;
