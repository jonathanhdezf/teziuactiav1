import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AccordionDemands from '../app/components/AccordionDemands';

describe('AccordionDemands', () => {
  it('renders all accordion items', () => {
    render(<AccordionDemands />);

    expect(screen.getByText('Inclusión Expresa al Reglamento')).toBeInTheDocument();
    expect(screen.getByText('Tarifa Proporcional Justa (50%)')).toBeInTheDocument();
    expect(screen.getByText('Cese Inmediato de Multas por Exclusión')).toBeInTheDocument();
    expect(screen.getByText('Zonas de Parada Breve (10 min sin costo)')).toBeInTheDocument();
  });

  it('expands item on click', async () => {
    const user = userEvent.setup();
    render(<AccordionDemands />);

    const buttons = screen.getAllByRole('button');
    const firstButton = buttons[0];
    
    // First item starts expanded, so click to close it first
    await user.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    
    // Click again to open
    await user.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('only allows one item open at a time', async () => {
    const user = userEvent.setup();
    render(<AccordionDemands />);

    const buttons = screen.getAllByRole('button');

    // Close the first item (starts open)
    await user.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');

    // Open second item
    await user.click(buttons[1]);
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');

    // Open third item - should close item 2
    await user.click(buttons[2]);
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
  });
});
