import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste do Componente PokemonDetails', () => {
  it('Teste se as informações detalhadas dos Pokémons aparecem', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
    const nome = pokemon.textContent;
    const pokemonObj = pokemonList.filter((e) => e.name === nome);
    const pokemonSummary = pokemonObj[0].summary;

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const title = screen.getByRole('heading', { level: 2, name: `${nome} Details` });
    expect(title).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(summary).toBeInTheDocument();

    const summaryText = document.querySelectorAll('p')[3];
    expect(summaryText).toHaveTextContent(pokemonSummary);
  });

  it('Teste se a seção dos mapas esa funcionando', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
    const nome = pokemon.textContent;
    const pokemonObj = pokemonList.filter((e) => e.name === nome);
    const pokemonMap = pokemonObj[0].foundAt;

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const p = screen.getByRole('heading', { level: 2, name: `Game Locations of ${nome}` });
    expect(p).toBeInTheDocument();

    const mapas = screen.getAllByAltText(/location/i);
    expect(mapas).toHaveLength(pokemonMap.length);

    const mapTitles = document.querySelectorAll('em');
    expect(mapTitles).toHaveLength(pokemonMap.length);

    for (let index = 0; index < pokemonMap.length; index += 1) {
      const { location, map } = pokemonMap[index];
      expect(mapas[index]).toHaveAttribute('src', map);
      expect(mapas[index]).toHaveAttribute('alt', `${nome} location`);
      expect(mapTitles[index]).toHaveTextContent(location);
    }
  });

  it('Teste o botão de favoritar', () => {
    renderWithRouter(<App />);

    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toBeInTheDocument();
    const nome = pokemon.textContent;

    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const favoriteButton = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    const estrela = screen.getByAltText(/marked as favorite/i);
    expect(estrela).toBeInTheDocument();
    expect(estrela).toHaveAttribute('src', '/star-icon.svg');
    expect(estrela).toHaveAttribute('alt', `${nome} is marked as favorite`);

    userEvent.click(favoriteButton);
    expect(estrela).not.toBeInTheDocument();
  });
});
