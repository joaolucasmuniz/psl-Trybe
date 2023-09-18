import allNwes from '../mocks/allNews';
import news from '../mocks/news';
import oneNew from '../mocks/oneNew';
import release from '../mocks/release';

const mockFetch = (url: any) => Promise.resolve({
  json: () => {
    if (url === 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=1') { return Promise.resolve(oneNew); }
    if (url === 'https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10') { return Promise.resolve(allNwes); }
    if (url === 'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=noticia&qtd=10') { return Promise.resolve(news); }
    if (url === 'https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=release&qtd=10') { return Promise.resolve(release); }
  },
});
export default mockFetch;
