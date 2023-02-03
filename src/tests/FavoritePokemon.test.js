import React from 'react';
import { screen } from '@testing-library/react';
import pokemonList from '../data';
import { FavoritePokemon } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste do Componente FavoritePokemon', () => {
  it('Deve renderizar a Page com uma lista vazia', () => {
    const emptyList = [];

    renderWithRouter(<FavoritePokemon pokemonList={ emptyList } />);

    const title = screen.getByText(/No favorite Pokémon found/i);
    expect(title).toBeInTheDocument();
  });

  it('Deve renderizar a Page com uma lista de favoritos', () => {
    const favoritedList = pokemonList.filter((pokemon) => (pokemon.name === 'Pikachu'));

    renderWithRouter(<FavoritePokemon pokemonList={ favoritedList } />);

    const favoritedPokemon = screen.getAllByAltText(/marked as favorite/i);
    expect(favoritedPokemon).toHaveLength(1);
  });
});
