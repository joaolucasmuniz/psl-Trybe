import { useEffect, useState } from 'react';
import Card from '../componentes/card';
import MainCard from '../componentes/mainCard';
import { NewsInfo, Newsdata } from '../types/types';

function Home() {
  const [news, setNews] = useState<Newsdata>();
  const [allNews, setAllNews] = useState<NewsInfo[]>([]);
  const apiUrl = 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10';

  const fetchApi = async (link:string) => {
    try {
      const response = await fetch(link);
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    try {
      const data = await fetchApi(`${apiUrl}&page=${news?.nextPage}`);
      setNews(data);
      setAllNews([...allNews, ...data.items]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const initialFetch = async () => {
      const data = await fetchApi(apiUrl);
      setNews(data);
      setAllNews(data.items);
    };
    initialFetch();
  }, []);
  return (
    <>

      <section>
        { news && (
          <MainCard
            id={ news.items[0].id }
            titulo={ news.items[0].titulo }
            introducao={ news.items[0].introducao }
            dataPublicacao={ news.items[0].data_publicacao }
            link={ news.items[0].link }
          />
        )}
      </section>
      <section>
        {allNews.map((item, index) => index > 0 && (
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
      </section>
    </>

  );
}
export default Home;
