import { Button } from '@/components/Button';
import { render, screen } from '@testing-library/react';

describe('Button', () => {
  it('renders without crashing', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: 'Click me' }),
    ).toBeInTheDocument();
  });

  it('applies rounded-md-full token class', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toHaveClass(
      'rounded-md-full',
    );
  });

  it('applies md-elevation token class for filled variant', () => {
    render(<Button variant="filled">Filled</Button>);
    expect(screen.getByRole('button', { name: 'Filled' })).toHaveClass(
      'shadow-md-elevation-1',
    );
  });

  it('does not apply hardcoded shadow class', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).not.toHaveClass(
      'shadow',
    );
  });

  it('renders icon when provided', () => {
    render(<Button icon={<span data-testid="icon">★</span>}>With icon</Button>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole('button', { name: 'Custom' })).toHaveClass(
      'custom-class',
    );
  });
});
