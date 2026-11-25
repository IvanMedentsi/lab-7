import { test, expect } from '@playwright/test';

test.describe('Динамічне завантаження', () => {
  test('поява тексту після натискання кнопки Start', async ({ page }) => {
    await page.goto('/dynamic_loading/2');

    await page.getByRole('button', { name: 'Start' }).click();

    await expect(page.locator('#finish'))
      .toBeVisible({ timeout: 15_000 });

    await expect(page.locator('#finish'))
      .toHaveText('Hello World!');

    await expect(page.locator('#loading')).toBeHidden();
  });
});