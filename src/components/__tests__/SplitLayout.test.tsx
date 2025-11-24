import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SplitLayout } from '../SplitLayout';

describe('SplitLayout', () => {
  beforeEach(() => {
    localStorage.clear();
    window.history.replaceState({}, '', '/');
  });

  it('should render landing selector by default', () => {
    render(
      <SplitLayout curiosity={<div>Curiosity Content</div>} formal={<div>Formal Content</div>} />,
    );
    expect(screen.getByText('Select a Profile')).toBeInTheDocument();
  });

  it('should show curiosity content after selecting it', async () => {
    const user = userEvent.setup();
    render(
      <SplitLayout curiosity={<div>Curiosity Content</div>} formal={<div>Formal Content</div>} />,
    );

    const curiosityButton = screen.getByText('Curiosity').closest('button');
    expect(curiosityButton).toBeInTheDocument();
    if (curiosityButton) await user.click(curiosityButton);

    expect(screen.getByText('Curiosity Content')).toBeInTheDocument();
  });

  it('should toggle between views', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/?side=curiosity'); // Start in curiosity mode

    render(
      <SplitLayout curiosity={<div>Curiosity Content</div>} formal={<div>Formal Content</div>} />,
    );

    const toggleButton = screen.getByLabelText(/switch to/i);
    await user.click(toggleButton);

    expect(screen.getByText('Formal Content')).toBeInTheDocument();
    expect(screen.queryByText('Curiosity Content')).not.toBeInTheDocument();
  });

  it('should persist side preference to localStorage', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/?side=curiosity');

    render(
      <SplitLayout curiosity={<div>Curiosity Content</div>} formal={<div>Formal Content</div>} />,
    );

    const toggleButton = screen.getByLabelText(/switch to/i);
    await user.click(toggleButton);

    expect(localStorage.getItem('portfolio-side')).toBe('formal');
  });

  it('should sync with URL query parameter', () => {
    window.history.replaceState({}, '', '/?side=formal');

    render(
      <SplitLayout curiosity={<div>Curiosity Content</div>} formal={<div>Formal Content</div>} />,
    );

    expect(screen.getByText('Formal Content')).toBeInTheDocument();
  });
});
