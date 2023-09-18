import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from './helpers/mockFetch';

describe('MainCard', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });
  test('se renderiza a noticia mais recente e seu conteudo', async () => {
    renderWithRouter(<App />);
    const redInfo = await screen.findByText(/Notícia mais recente/i);
    const img = await screen.findByRole('img', { name: /imagem da noticia/i });

    expect(redInfo).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });
  test('se o btn de favoritar funciona', async () => {
    renderWithRouter(<App />);
    const btn = await screen.findByTestId('mainCardHeart');
    expect(btn).toBeInTheDocument();
    userEvent.click(btn);
    const btnRed = await screen.findByTestId('mainCardRedHeart');
    expect(btnRed).toBeInTheDocument();
  });
});
