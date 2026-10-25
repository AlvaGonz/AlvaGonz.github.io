import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Hobbies } from '../Hobbies';

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('Hobbies', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Mock IntersectionObserver for framer-motion useInView / FadeInOnScroll
    class MockIntersectionObserver {
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.style.overflow = '';
  });

  it('renders all hobbies', () => {
    render(<Hobbies />);
    expect(screen.getByText('Hobbies & Interests')).toBeInTheDocument();
    expect(screen.getByText('Tech Tinkering')).toBeInTheDocument();
    expect(screen.getByText('Working Out')).toBeInTheDocument();
    expect(screen.getByText('Reading')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
  });

  it('triggers BSOD easter egg modal via portal after 5 clicks', async () => {
    render(<Hobbies />);

    const tinkeringCard = screen.getByText('Tech Tinkering').closest('div');
    expect(tinkeringCard).toBeInTheDocument();

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    // Click 4 times - should not trigger
    for (let i = 0; i < 4; i++) {
      fireEvent.click(tinkeringCard!);
    }
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    // 5th click triggers BSOD
    fireEvent.click(tinkeringCard!);

    const bsod = screen.getByRole('alert');
    expect(bsod).toBeInTheDocument();
    expect(screen.getByText('CRITICAL_PROCESS_DIED', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('user_patience.sys', { exact: false })).toBeInTheDocument();

    // Should lock document.body overflow
    expect(document.body.style.overflow).toBe('hidden');

    // Auto-dismisses after 4 seconds
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });

  it('dismisses BSOD on Escape key', () => {
    render(<Hobbies />);
    const tinkeringCard = screen.getByText('Tech Tinkering').closest('div');

    for (let i = 0; i < 5; i++) {
      fireEvent.click(tinkeringCard!);
    }

    expect(screen.getByRole('alert')).toBeInTheDocument();

    act(() => {
      fireEvent.keyDown(window, { key: 'Escape' });
    });

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
  });
});
