import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { SideProvider } from '@/context/SideContext';
import { SplitLayout } from '../layout/SplitLayout';

describe('SplitLayout', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  it('should render landing selector by default', () => {
    render(
      <SideProvider>
        <SplitLayout Curiosity={<div>Curiosity Content</div>} Formal={<div>Formal Content</div>} />
      </SideProvider>,
    );
    expect(screen.getByText('Select a Profile')).toBeInTheDocument();
  });

  it('should show Curiosity content after selecting it', async () => {
    const user = userEvent.setup();
    render(
      <SideProvider>
        <SplitLayout Curiosity={<div>Curiosity Content</div>} Formal={<div>Formal Content</div>} />
      </SideProvider>,
    );

    const CuriosityButton = screen.getByText('Curiosity').closest('button');
    expect(CuriosityButton).toBeInTheDocument();
    if (CuriosityButton) await user.click(CuriosityButton);

    expect(screen.getByText('Curiosity Content')).toBeInTheDocument();
  });

  it('should toggle between views', async () => {
    window.history.replaceState({}, '', '/?side=Curiosity');

    render(
      <SideProvider>
        <SplitLayout Curiosity={<div>Curiosity Content</div>} Formal={<div>Formal Content</div>} />
      </SideProvider>,
    );

    const toggleButton = screen.getByRole('button', { name: /formal/i });
    fireEvent.click(toggleButton);

    await waitFor(() => expect(screen.getByText('Formal Content')).toBeInTheDocument());
    expect(screen.queryByText('Curiosity Content')).not.toBeInTheDocument();
  });

  it('should persist side preference to localStorage', async () => {
    window.history.replaceState({}, '', '/?side=Curiosity');

    render(
      <SideProvider>
        <SplitLayout Curiosity={<div>Curiosity Content</div>} Formal={<div>Formal Content</div>} />
      </SideProvider>,
    );

    const toggleButton = screen.getByRole('button', { name: /formal/i });
    fireEvent.click(toggleButton);

    expect(window.localStorage.getItem('portfolio-side')).toBe('formal');
  });

  it('should sync with URL query parameter', () => {
    window.history.replaceState({}, '', '/?side=formal');

    render(
      <SideProvider>
        <SplitLayout Curiosity={<div>Curiosity Content</div>} Formal={<div>Formal Content</div>} />
      </SideProvider>,
    );

    expect(screen.getByText('Formal Content')).toBeInTheDocument();
  });
});
