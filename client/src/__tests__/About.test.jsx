// __tests__/About.test.jsx
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About Component', () => {
  it('renders the introduction section', () => {
    render(<About />);
    const introductionElement = screen.getByText(/Introducing OptimOps.ai/i);
    expect(introductionElement).toBeInTheDocument();
  });

  it('renders MLOps Solutions', () => {
    render(<About />);
    const mlopsElement = screen.getByText(/MLOps Solutions/i);
    expect(mlopsElement).toBeInTheDocument();
  });

  it('renders DevOps Strategy and Implementation', () => {
    render(<About />);
    const devopsElement = screen.getByText(/DevOps Strategy and Implementation/i);
    expect(devopsElement).toBeInTheDocument();
  });

  it('renders Agile Transformation', () => {
    render(<About />);
    const agileElement = screen.getByText(/Agile Transformation/i);
    expect(agileElement).toBeInTheDocument();
  });
});