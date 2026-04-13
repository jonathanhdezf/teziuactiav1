import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignatureForm from '../app/components/SignatureForm';

// Mock fetch for API calls
global.fetch = jest.fn();

beforeEach(() => {
  (fetch as jest.Mock).mockReset();
});

describe('SignatureForm', () => {
  it('renders the form with all fields', () => {
    // Mock the count fetch
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ total: 42 }),
    });

    render(<SignatureForm />);

    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/domicilio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /firmar la petición/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty required fields', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ total: 0 }),
    });

    const user = userEvent.setup();
    render(<SignatureForm />);

    const submitButton = screen.getByRole('button', { name: /firmar la petición/i });
    await user.click(submitButton);

    expect(await screen.findByText(/ingresa tu nombre/i)).toBeInTheDocument();
    expect(screen.getByText(/ingresa tu domicilio/i)).toBeInTheDocument();
  });

  it('submits successfully with valid data', async () => {
    // Mock count fetch
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve({ total: 50 }),
    });

    // Mock POST fetch
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ success: true, signatureCount: 51 }),
    });

    const user = userEvent.setup();
    render(<SignatureForm />);

    const nameInput = screen.getByLabelText(/nombre completo/i);
    const addressInput = screen.getByLabelText(/domicilio/i);
    const checkbox = screen.getAllByRole('checkbox')[0];
    const submitButton = screen.getByRole('button', { name: /firmar la petición/i });

    await user.type(nameInput, 'Juan Pérez');
    await user.type(addressInput, 'Calle 5 de Mayo #123, Centro');
    await user.click(checkbox);
    await user.click(submitButton);

    // Should show success state
    expect(await screen.findByText(/tu firma cuenta/i)).toBeInTheDocument();
  });
});
