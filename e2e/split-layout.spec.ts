import { test, expect } from '@playwright/test';

test.describe('Split Layout', () => {
  test('should show hero on landing', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('header')).toBeVisible();
    const name = await page.textContent('header h1');
    expect(name).toContain('Adrian');
  });

  test('should toggle between curios and formal views', async ({ page }) => {
    await page.goto('/');

    // Default should be curios
    await expect(page.locator('text=curios Space')).toBeVisible();

    // Click toggle button
    const toggleButton = page.getByLabel(/switch to/i);
    await toggleButton.click();

    // Should show formal view
    await expect(page.locator('text=Skills & Technologies')).toBeVisible();
    await expect(page.locator('text=curios Space')).not.toBeVisible();

    // Toggle back
    await toggleButton.click();
    await expect(page.locator('text=curios Space')).toBeVisible();
  });

  test('should persist side preference in URL', async ({ page }) => {
    await page.goto('/?side=formal');
    await expect(page.locator('text=Skills & Technologies')).toBeVisible();

    // Toggle and verify URL updates
    const toggleButton = page.getByLabel(/switch to/i);
    await toggleButton.click();
    await expect(page).toHaveURL(/side=curios/);
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab to toggle button
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toHaveText(/Formal|curios/);

    // Press Enter to toggle
    await page.keyboard.press('Enter');
    await expect(page.locator('text=Skills & Technologies')).toBeVisible();
  });
});

