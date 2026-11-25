
import { test, expect } from '@playwright/test';

test.describe('Робота з браузерними діалогами', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/javascript_alerts');
  });

  test('обробка Alert', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });

    await page.getByRole('button', { name: 'Click for JS Alert' }).click();

    await expect(page.locator('#result'))
      .toHaveText('You successfully clicked an alert');
  });

  test('відхилення Confirm', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.dismiss();
    });

    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();

    await expect(page.locator('#result'))
      .toHaveText('You clicked: Cancel');
  });

  test('введення тексту у Prompt', async ({ page }) => {
    page.once('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('Тестове значення');
    });

    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();

    await expect(page.locator('#result'))
      .toHaveText('You entered: Тестове значення');
  });
});
