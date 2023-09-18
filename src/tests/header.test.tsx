import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from './helpers/mockFetch';

describe('Header', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });
  test('se renderiza o reader', () => {
    renderWithRouter(<App />);
    const linkElement = screen.getByText(/trybe news/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('se renderiza a noticia mais recente e seu conteudo', async () => {
    renderWithRouter(<App />);
    const linkElement = await screen.findByText(/Notícia mais recente/i);
    const title = await screen.findByRole('heading', { name: /ibge: mais de 180 mil candidatos farão provas neste domingo, em todo o país/i });
    const img = await screen.findByRole('img', { name: /imagem da noticia/i });

    expect(linkElement).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
