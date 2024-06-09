// __tests__/Bot.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Bot from '../components/Bot';

describe('Bot Component', () => {
  it('renders the initial message', () => {
    render(<Bot />);
    const initialMessage = screen.getByText(/Hello, I'm Optimus! How can I help you?/i);
    expect(initialMessage).toBeInTheDocument();
  });

  it('sends a message', async () => {
    render(<Bot />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.input(inputElement, { target: { textContent: 'Hello!' } });

    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter', charCode: 13 });

    const sentMessage = await screen.getByText(/Hello!/i);

    expect(sentMessage).toBeInTheDocument();
  });
});