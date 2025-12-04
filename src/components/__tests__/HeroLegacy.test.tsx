import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroLegacy } from '../HeroLegacy';

describe('HeroLegacy', () => {
  it('should render the component', () => {
    render(<HeroLegacy />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(screen.getByText('HeroLegacy Component')).toBeInTheDocument();
  });
});
