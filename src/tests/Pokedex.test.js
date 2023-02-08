import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemonList from '../data';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste do Componente Pokedex', () => {
  it('Deve renderizar o texto Pokemon Encontrado', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { level: 2, name: 'Encountered Pokémon' });
    expect(title).toBeInTheDocument();
  });

  it('Teste o botão Próximo Pokemon', () => {
    const pokemons = pokemonList;
    const numPokemons = pokemons.length + 1;

    renderWithRouter(<App />);

    const atualPokemon = screen.getByTestId('pokemon-name');
    const proxPokemon = screen.getByTestId('next-pokemon');
    expect(proxPokemon).toHaveTextContent('Próximo Pokémon');

    for (let index = 0; index < numPokemons; index += 1) {
      if (index === pokemons.length) {
        expect(atualPokemon).toHaveTextContent(pokemons[0].name);
      } else {
        expect(atualPokemon).toHaveTextContent(pokemons[index].name);
        userEvent.click(proxPokemon);
      }
    }
  });

  it('Teste se é renderizado um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const atualPokemon = screen.getAllByAltText(/sprite/i);
    expect(atualPokemon).toHaveLength(1);
  });

  it('Teste o painel de filtros dos Tipos de Pokémon', () => {
    renderWithRouter(<App />);

    const atualPokemon = screen.getByTestId('pokemon-type');

    const painelTipos = screen.getAllByTestId('pokemon-type-button');
    const botaoAll = screen.getByText(/All/i);
    expect(botaoAll).toHaveTextContent('All');
    expect(painelTipos).toHaveLength(7);

    const normalType = painelTipos[5];
    const dragonType = painelTipos[6];
    expect(normalType).toHaveTextContent('Normal');
    expect(dragonType).toHaveTextContent('Dragon');

    userEvent.click(normalType);
    expect(atualPokemon).toHaveTextContent('Normal');
    expect(botaoAll).not.toBeDisabled();

    userEvent.click(dragonType);
    expect(atualPokemon).toHaveTextContent('Dragon');
    expect(botaoAll).not.toBeDisabled();
  });

  it('Teste o botão do filtro All', () => {
    const pokemons = pokemonList;

    renderWithRouter(<App />);

    const painelTipos = screen.getAllByTestId('pokemon-type-button');
    const otherFilter = painelTipos[3];
    const botaoAll = screen.getByText(/All/i);
    expect(botaoAll).toHaveTextContent('All');

    const atualPokemon = screen.getByTestId('pokemon-name');
    const proxPokemon = screen.getByTestId('next-pokemon');

    for (let index = 0; index < pokemons.length; index += 1) {
      expect(atualPokemon).toHaveTextContent(pokemons[index].name);
      userEvent.click(proxPokemon);
    }

    userEvent.click(otherFilter);
    userEvent.click(botaoAll);
    for (let index = 0; index < pokemons.length; index += 1) {
      expect(atualPokemon).toHaveTextContent(pokemons[index].name);
      userEvent.click(proxPokemon);  
    }
  });
});
