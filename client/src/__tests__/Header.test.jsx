// __tests__/Header.test.jsx
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';

describe('Header Component', () => {
  it('renders the logo', () => {
    render(<Header />);
    const logoElement = screen.getByAltText('robot-graphic');
    expect(logoElement).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<Header />);
    const titleElement = screen.getByRole('heading', { name: /OptimOps.ai/i });
    expect(titleElement).toBeInTheDocument();
  });
});