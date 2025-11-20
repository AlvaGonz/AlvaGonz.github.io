import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroLegacy } from '../HeroLegacy';
import { profile } from '../../content/profile';

describe('HeroLegacy', () => {
  it('should render name and role', () => {
    render(<HeroLegacy />);
    expect(screen.getByText(profile.name)).toBeInTheDocument();
    expect(screen.getByText(profile.role, { exact: false })).toBeInTheDocument();
  });

  it('should render profile image with alt text', () => {
    render(<HeroLegacy />);
    const img = screen.getByAltText(`${profile.name} profile`);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', profile.avatar);
  });

  it('should have Axiforma font class', () => {
    render(<HeroLegacy />);
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });
});

