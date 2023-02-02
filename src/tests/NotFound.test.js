import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Teste do Componente NotFound', () => {
  it('Deve renderizar o componente NotFound', () => {
    render(<NotFound />);

    const title = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    expect(title).toBeInTheDocument();
  });

  it('Testando imagem no componente About', () => {
    render(<NotFound />);

    const img = screen.getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
