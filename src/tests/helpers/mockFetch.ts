import allNews from '../mocks/allNews';
import allNewsPage2 from '../mocks/allNews-Page2';
import news from '../mocks/news';
import oneNew from '../mocks/oneNew';
import release from '../mocks/release';

const mockFetch = (url: any) => Promise.resolve({
  json: () => {
    if (url === 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=1') { return Promise.resolve(oneNew); }
    if (url === 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10') { return Promise.resolve(allNews); }
    if (url === 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10&page=2') { return Promise.resolve(allNewsPage2); }
    if (url === 'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=10') { return Promise.resolve(news); }
    if (url === 'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release&qtd=10') { return Promise.resolve(release); }
  },
});
export default mockFetch;
