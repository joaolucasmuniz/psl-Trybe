import { useEffect, useState } from 'react';
import Card from '../card';
import fetchApi from '../../helpers/fetchApi';
import { NewsInfo } from '../../types/types';

type NewsProps = {
  type: string;
};

function News(props: NewsProps) {
  const { type } = props;
  const [news, setNews] = useState<NewsInfo[]>([]);
  const [page, setPage] = useState(1);

  const apiUrls = {
    all: 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10',
    news: 'http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=10',
    release: 'http://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release&qtd=10',
  };

  useEffect(() => {
    const initialFetch = async () => {
      const data = await fetchApi(apiUrls[type as keyof typeof apiUrls]);
      if (type === 'all') setNews(data.items.slice(0, 1));
      setNews(data.items);
    };
    initialFetch();
  }, [type]);

  const handleClick = async () => {
    try {
      const data = await fetchApi(
        `${apiUrls[type as keyof typeof apiUrls]}&page=${page}`,
      );
      setNews([...news, ...data.items]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {news.map((item, index) => index > 0 && (
        <Card
          id={ item.id }
          key={ index }
          titulo={ item.titulo }
          introducao={ item.introducao }
          dataPublicacao={ item.data_publicacao }
          link={ item.link }
        />
      ))}
      <button onClick={ () => handleClick() }>ver mais</button>
    </>
  );
}

export default News;
