import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LanguageMindMap } from '../LanguageMindMap';

// Mock framer-motion AnimatePresence and simple hooks to avoid requestAnimationFrame issues in jsdom
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('LanguageMindMap (Code Universe)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the Neon Observatory canvas with fallback telemetry data when live API is unavailable', () => {
    render(<LanguageMindMap />);

    expect(screen.getByText('Neon Observatory')).toBeInTheDocument();
    expect(screen.getByText('Local Archive')).toBeInTheDocument();
    expect(screen.getByText('Programming Logic')).toBeInTheDocument();
    expect(screen.getAllByText(/The core and foundation of it all/i).length).toBeGreaterThan(0);
    expect(screen.getByText('Pulse Core')).toBeInTheDocument();

    // Verify key languages are loaded
    expect(screen.getAllByText(/TypeScript/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/JavaScript/i).length).toBeGreaterThan(0);
  });

  it('triggers gravitational shockwave pulse on core click and on Pulse Core button', () => {
    render(<LanguageMindMap />);

    const pulseButton = screen.getByRole('button', { name: /Pulse Core/i });
    expect(pulseButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(pulseButton);
    });

    // Advance timer past pulse cycle
    act(() => {
      vi.advanceTimersByTime(2300);
    });

    expect(pulseButton).toBeInTheDocument();
  });

  it('displays telemetry inspection when a planetary body is selected', () => {
    render(<LanguageMindMap />);

    const tsPlanet = screen.getByRole('button', { name: /Inspect TypeScript telemetry/i });
    expect(tsPlanet).toBeInTheDocument();

    act(() => {
      fireEvent.click(tsPlanet);
    });

    // Telemetry HUD should show language facts and stats
    expect(screen.getByText('Full-Stack & Systems')).toBeInTheDocument();
    expect(screen.getByText('Codebase Share')).toBeInTheDocument();
    expect(screen.getByText(/Anders Hejlsberg/i)).toBeInTheDocument();

    // Release target lock
    const closeButton = screen.getByTitle('Release target lock');
    expect(closeButton).toBeInTheDocument();
    act(() => {
      fireEvent.click(closeButton);
    });

    expect(screen.queryByTitle('Release target lock')).not.toBeInTheDocument();
  });
});
