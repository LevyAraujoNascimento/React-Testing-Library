import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';
import { Pokemon } from '../components';
import App from '../App';

describe('Teste do Componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações do Pokémon', () => {
    const pikachu = pokemonList[0];

    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite={ false } />);

    const nomePokemon = screen.getByTestId('pokemon-name');
    expect(nomePokemon).toHaveTextContent(pikachu.name);

    const tipoPokemon = screen.getByTestId('pokemon-type');
    expect(tipoPokemon).toHaveTextContent(pikachu.type);

    const pesoPokemon = screen.getByTestId('pokemon-weight');
    const { value } = pikachu.averageWeight;
    const { measurementUnit } = pikachu.averageWeight;
    const weightText = `Average weight: ${value} ${measurementUnit}`;
    expect(pesoPokemon).toHaveTextContent(weightText);

    const pokemonURL = pikachu.image;
    const img = screen.getByAltText(/sprite/i);
    expect(img).toHaveAttribute('src', pokemonURL);
    expect(img).toHaveAttribute('alt', `${pikachu.name} sprite`);
  });

  it('Teste se o link para exibir os detalhes está funcionando', () => {
    const pikachu = pokemonList[0];

    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pikachu }
        isFavorite={ false }
      />
    );

    const detalhes = screen.getByRole('link', { name: 'More details' });
    expect(detalhes).toBeInTheDocument();
    userEvent.click(detalhes);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemon/${pikachu.id}`);
  });

  it('Teste se renderiza os Pokemons Favoritos', () => {
    const pikachu = pokemonList[0];
    const nomePokemon = pikachu.name;

    renderWithRouter(<App />);

    const detalhes = screen.getByRole('link', { name: 'More details' });
    expect(detalhes).toBeInTheDocument();
    userEvent.click(detalhes);

    const favoriteButton = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    const estrela = screen.getByAltText(/marked as favorite/i);
    expect(estrela).toBeInTheDocument();
    expect(estrela).toHaveAttribute('src', '/star-icon.svg');
    expect(estrela).toHaveAttribute('alt', `${nomePokemon} is marked as favorite`);
  });
});
