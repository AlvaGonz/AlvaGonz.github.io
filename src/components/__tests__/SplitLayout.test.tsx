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
      <SplitLayout curiousity={<div>curiousity Content</div>} formal={<div>Formal Content</div>} />,
    );
    expect(screen.getByText('Select a Profile')).toBeInTheDocument();
  });

  it('should show curiousity content after selecting it', async () => {
    const user = userEvent.setup();
    render(
      <SplitLayout curiousity={<div>curiousity Content</div>} formal={<div>Formal Content</div>} />,
    );

    const curiousityButton = screen.getByText('curiousity').closest('button');
    expect(curiousityButton).toBeInTheDocument();
    if (curiousityButton) await user.click(curiousityButton);

    expect(screen.getByText('curiousity Content')).toBeInTheDocument();
  });

  it('should toggle between views', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/?side=curiousity'); // Start in curiousity mode

    render(
      <SplitLayout curiousity={<div>curiousity Content</div>} formal={<div>Formal Content</div>} />,
    );

    const toggleButton = screen.getByLabelText(/switch to/i);
    await user.click(toggleButton);

    expect(screen.getByText('Formal Content')).toBeInTheDocument();
    expect(screen.queryByText('curiousity Content')).not.toBeInTheDocument();
  });

  it('should persist side preference to localStorage', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/?side=curiousity');

    render(
      <SplitLayout curiousity={<div>curiousity Content</div>} formal={<div>Formal Content</div>} />,
    );

    const toggleButton = screen.getByLabelText(/switch to/i);
    await user.click(toggleButton);

    expect(localStorage.getItem('portfolio-side')).toBe('formal');
  });

  it('should sync with URL query parameter', () => {
    window.history.replaceState({}, '', '/?side=formal');

    render(
      <SplitLayout curiousity={<div>curiousity Content</div>} formal={<div>Formal Content</div>} />,
    );

    expect(screen.getByText('Formal Content')).toBeInTheDocument();
  });
});
