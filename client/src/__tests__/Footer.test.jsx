// __tests__/Footer.test.jsx
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  it('renders the footer text with the current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    const footerElement = screen.getByText(`© ${year} InnovaOps.ai - All rights reserved`);
    expect(footerElement).toBeInTheDocument();
  });
});