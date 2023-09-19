import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import mockFetch from './helpers/mockFetch';

describe('News', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeEach(async () => {
    global.fetch = vi.fn().mockImplementation(mockFetch as any);
  });
  test('se renderiza todas as noticas', async () => {
    renderWithRouter(<App />);
    const cardTitle = await screen.findAllByTestId('cardTitle');
    expect(cardTitle).toHaveLength(10);

    const btnSeeMore = await screen.findByTestId('btnSeeMore');
    expect(btnSeeMore).toBeInTheDocument();

    await userEvent.click(btnSeeMore);
    const cardTitle2 = await screen.findAllByTestId('cardTitle');
    expect(cardTitle2).toHaveLength(20);
  });
});
