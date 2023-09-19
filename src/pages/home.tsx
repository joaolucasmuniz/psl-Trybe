import { useEffect, useState } from 'react';
import News from '../componentes/news';
import { Newsdata } from '../types/types';
import MainCard from '../componentes/mainCard';
import Favorites from '../componentes/favorites';

import styles from './home.module.css';
import NavBar from '../componentes/navbar';
import fetchApi from '../helpers/fetchApi';

function Home() {
  const [currentNav, setCurrentNav] = useState('Mais recentes');
  const [news, setNews] = useState<Newsdata>();

  useEffect(
    () => {
      const initialFetch = async () => {
        const data = await fetchApi('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=1');
        setNews(data);
      };
      initialFetch();
    },
    [],
  );

  return (
    <section className={ styles.homeContainer }>
      <section>
        { news && (
          <MainCard
            id={ news.items[0].id }
            titulo={ news.items[0].titulo }
            introducao={ news.items[0].introducao }
            dataPublicacao={ news.items[0].data_publicacao }
            link={ news.items[0].link }
            imagens={ news.items[0].imagens }
          />
        )}
      </section>

      <NavBar setCurrentNav={ setCurrentNav } currentNav={ currentNav } />

      <section className={ styles.newsSection }>

        {currentNav === 'Mais recentes' && <News type="all" />}
        {currentNav === 'Release' && <News type="release" />}
        {currentNav === 'Notícias' && <News type="news" />}
        {currentNav === 'Favoritas' && <Favorites />}

      </section>
    </section>

  );
}
export default Home;
