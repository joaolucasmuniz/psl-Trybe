import { useEffect, useState } from 'react';
import News from '../componentes/news';
import { Newsdata } from '../types/types';
import MainCard from '../componentes/mainCard';
import Favorites from '../componentes/favorites';

import styles from './home.module.css';
import NavBar from '../componentes/navbar';

function Home() {
  const [currentNav, setCurrentNav] = useState('all');
  const [news, setNews] = useState<Newsdata>();

  useEffect(
    () => {
      const initialFetch = async () => {
        const data = await fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=1');
        const json = await data.json();
        setNews(json);
        console.log(json.items);
      };
      initialFetch();
    },
    [],
  );

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

      <NavBar setCurrentNav={ setCurrentNav } />

      <section className={ styles.newsSection }>
        {currentNav === 'all'
      && <News type="all" />}
        {currentNav === 'Release'
      && <News type="release" />}
        {currentNav === 'Notícias'
      && <News type="news" />}
        {currentNav === 'Favoritas'
      && <Favorites />}
      </section>
    </>

  );
}
export default Home;
