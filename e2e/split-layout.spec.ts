import { test, expect } from '@playwright/test';

test.describe('Split Layout', () => {
  // Mock the GitHub GraphQL API call for pinned projects
  test.beforeEach(async ({ page }) => {
    await page.route('https://api.github.com/graphql', async (route) => {
      const json = {
        data: {
          user: {
            pinnedItems: {
              nodes: [
                {
                  name: 'Mock Project 1',
                  description: 'This is a mocked project description.',
                  url: 'https://github.com/AlvaGonz/mock-project-1',
                  stargazerCount: 10,
                  forkCount: 2,
                  primaryLanguage: { name: 'TypeScript', color: '#3178C6' },
                },
                {
                  name: 'Mock Project 2',
                  description: 'Another mocked project.',
                  url: 'https://github.com/AlvaGonz/mock-project-2',
                  stargazerCount: 20,
                  forkCount: 5,
                  primaryLanguage: { name: 'JavaScript', color: '#F1E05A' },
                },
              ],
            },
          },
        },
      };
      await route.fulfill({ json });
    });
  });

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

    // Should show formal view and mocked projects
    await expect(page.locator('text=Skills & Technologies')).toBeVisible();
    await expect(page.locator('text=curios Space')).not.toBeVisible();
    await expect(page.locator('text=Mock Project 1')).toBeVisible();
  });

  test('should persist side preference in URL', async ({ page }) => {
    await page.goto('/?side=formal');
    await expect(page.locator('text=Skills & Technologies')).toBeVisible();
    await expect(page.locator('text=Mock Project 2')).toBeVisible();

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
    await expect(page.locator('text=Mock Project 1')).toBeVisible();
  });
});

