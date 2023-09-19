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
  test('se renderiza a navbar', async () => {
    renderWithRouter(<App />);

    const navbar = await screen.findByTestId('navbar');
    expect(navbar).toBeInTheDocument();

    const allCategory = await screen.findByTestId('Mais recentes-category-filter');
    expect(allCategory).toBeInTheDocument();

    const releaseCategory = await screen.findByTestId('Release-category-filter');
    expect(releaseCategory).toBeInTheDocument();

    const newsCategory = await screen.findByTestId('Notícias-category-filter');
    expect(newsCategory).toBeInTheDocument();
  });

  test('se a navbar funciona corretamente', async () => {
    renderWithRouter(<App />);

    const releaseCategory = await screen.findByTestId('Release-category-filter');
    await userEvent.click(releaseCategory);
    const cards = await screen.findAllByTestId('card-release');
    expect(cards).toHaveLength(10);

    const newsCategory = await screen.findByTestId('Notícias-category-filter');
    await userEvent.click(newsCategory);
    const newsCards = await screen.findAllByTestId('card-news');
    expect(newsCards).toHaveLength(10);

    const allCategory = await screen.findByTestId('Mais recentes-category-filter');
    await userEvent.click(allCategory);
    const allCards = await screen.findAllByTestId(/card-all/);
    expect(allCards).toHaveLength(10);

    const favoriteButton = await screen.findByTestId('Favoritas-category-filter');
    expect(favoriteButton).toBeInTheDocument();
  });
});
