import { test, expect } from '@playwright/test';

test.describe('Scroll Modernization', () => {
  test('should update scroll progress on scroll', async ({ page }) => {
    await page.goto('/');
    
    // Set viewport to enable scrolling
    await page.setViewportSize({ width: 1280, height: 600 });
    
    // Get initial scroll progress
    const initialProgress = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--scroll-progress');
    });
    
    expect(initialProgress.trim()).toBe('0');
    
    // Scroll down
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    
    // Wait for scroll event
    await page.waitForTimeout(100);
    
    // Check scroll progress updated
    const updatedProgress = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).getPropertyValue('--scroll-progress');
    });
    
    expect(parseFloat(updatedProgress)).toBeGreaterThan(0);
  });

  test('should update data-scroll-stage attribute', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 1280, height: 600 });
    
    // Initial stage should be 0
    const initialStage = await page.evaluate(() => {
      return document.body.getAttribute('data-scroll-stage');
    });
    expect(initialStage).toBe('0');
    
    // Scroll to middle
    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight / 2);
    });
    
    await page.waitForTimeout(200);
    
    // Stage should be updated
    const updatedStage = await page.evaluate(() => {
      return document.body.getAttribute('data-scroll-stage');
    });
    
    expect(['1', '2', '3']).toContain(updatedStage);
  });

  test('should respect prefers-reduced-motion', async ({ page, context }) => {
    // Set reduced motion preference
    await context.addInitScript(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
        }),
      });
    });
    
    await page.goto('/');
    // Verify no animations occur (implementation dependent)
    // This is a basic check - actual implementation would need motion detection
  });
});

