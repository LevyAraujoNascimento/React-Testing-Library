import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { About } from '../pages';

describe('Teste do Componente About', () => {
  it('Deve renderizar o componente About', () => {
    render(<About />);

    const title = screen.getByRole('heading', { level:2, name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
  });

  it('Testando paragrafos no componente About', () => {
    render(<About />);

    const p = screen.getAllByText(/Pokémon/i);
    expect(p).toHaveLength(2);
  });

  it('Testando imagem no componente About', () => {
    render(<About />);

    const img = screen.getByAltText(/Pokédex/i);
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});

