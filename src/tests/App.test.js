import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do App', () => {
  it('Deve renderizar o componente App', () => {
    renderWithRouter(<App />);

    const title = screen.getByText(/Pokédex/i);
    expect(title).toBeInTheDocument();
  });

  it('Testando 1º Link', () => {
    const { history } = renderWithRouter(<App />);

    const primeiroLink = screen.getByRole('link', { name: 'Home' });
    expect(primeiroLink).toBeInTheDocument();
    userEvent.click(primeiroLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

    const homeTitle = screen.getByRole('link', { name: 'Home' });
    expect(homeTitle).toBeInTheDocument();
  });

  it('Testando 2º Link', () => {
    const { history } = renderWithRouter(<App />);

    const segundoLink = screen.getByRole('link', { name: 'About' });
    expect(segundoLink).toBeInTheDocument();
    userEvent.click(segundoLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');

    const aboutTitle = screen.getByRole('link', { name: 'About' });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Testando 3º Link', () => {
    const { history } = renderWithRouter(<App />);

    const terceiroLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(terceiroLink).toBeInTheDocument();
    userEvent.click(terceiroLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const aboutTitle = screen.getByRole('link', { name: 'Favorite Pokémon' });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Testando o caminho NotFound', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/pagina-que-nao-existe');
    });

    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
