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
});
