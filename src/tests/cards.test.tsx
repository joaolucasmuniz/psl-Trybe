import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from './helpers/mockFetch';

describe('Card', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });
  test('se renderiza a noticia e seu conteudo', async () => {
    renderWithRouter(<App />);
    const cardTitle = await screen.findAllByTestId('cardTitle');
    expect(cardTitle[0]).toHaveTextContent('IBGE: mais de 180 mil candidatos farão provas neste domingo, em todo o país');

    const cardText = await screen.findAllByTestId('cardText');
    expect(cardText[0]).toHaveTextContent('Processos seletivos receberam mais de 180 mil inscrições - Foto: Acervo IBGE A partir das 9h do próximo domingo, começam em todo o país as provas para Agente de Pesquisas e Mapeamento (APM) e Supervisor de Coleta e Qualidade (SCQ) do IBGE. Serão 181.610...');

    const btn = await screen.findAllByTestId('btnNoticiaCompleta');
    expect(btn[0]).toBeInTheDocument();
    expect(btn[0]).toHaveAttribute('href', 'http://agenciadenoticias.ibge.gov.br/agencia-noticias/2012-agencia-de-noticias/noticias/37917-ibge-mais-de-180-mil-candidatos-farao-provas-neste-domingo-em-todo-o-pais.html');
  });
  test('se o btn de favoritar funciona', async () => {
    renderWithRouter(<App />);
    const btn = await screen.findAllByTestId('btnHeart');
    expect(btn[0]).toBeInTheDocument();
    userEvent.click(btn[0]);
    const btnRed = await screen.findAllByTestId('btnRedHeart');
    expect(btnRed[0]).toBeInTheDocument();
  });
});
