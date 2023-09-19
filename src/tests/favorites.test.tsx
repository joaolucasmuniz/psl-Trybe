import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from './helpers/mockFetch';

describe('Navbar', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });
  test('se nao existir nenhuma noticia favoritada', async () => {
    renderWithRouter(<App />);

    const favoriteButton = await screen.findByTestId('Favoritas-category-filter');
    await userEvent.click(favoriteButton);
    const favoriteCards = screen.getByText(/você não possui favoritos/i);
    expect(favoriteCards).toBeInTheDocument();
  });

  test('se os favoritos sao renderizados', async () => {
    renderWithRouter(<App />);

    const btn = await screen.findAllByTestId('btnHeart');
    userEvent.click(btn[0]);
    userEvent.click(btn[1]);
    userEvent.click(btn[2]);
    userEvent.click(btn[3]);

    const favoriteButton = await screen.findByTestId('Favoritas-category-filter');
    await userEvent.click(favoriteButton);
    const favoriteCards = await screen.findAllByTestId('cardTitle');
    expect(favoriteCards).toHaveLength(4);
  });
});
