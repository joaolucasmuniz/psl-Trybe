import { useEffect, useState } from 'react';
import News from '../componentes/news';
import { Newsdata } from '../types/types';
import MainCard from '../componentes/mainCard';
import Favorites from '../componentes/favorites';

import styles from './home.module.css';

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

      <nav>
        <ul>
          <li>
            <button
              onClick={ () => setCurrentNav('all') }
            >
              Mais recentes

            </button>
          </li>

          <li>
            <button
              onClick={ () => setCurrentNav('Release') }
            >
              Release
            </button>
          </li>

          <li>
            <button
              onClick={ () => setCurrentNav('Notícias') }
            >
              Notícias
            </button>
          </li>

          <li>
            <button
              onClick={ () => setCurrentNav('Favoritas') }
              className={ currentNav === 'Favoritas' ? 'current' : '' }

            >
              Favoritas
            </button>
          </li>
        </ul>
      </nav>

      <section className={ styles.newsSection }>
        <div className={ styles.newsContainer }>
          {currentNav === 'all'
      && <News type="all" />}
          {currentNav === 'Release'
      && <News type="release" />}
          {currentNav === 'Notícias'
      && <News type="news" />}
          {currentNav === 'Favoritas'
      && <Favorites />}
        </div>
      </section>

    </>

  );
}
export default Home;
