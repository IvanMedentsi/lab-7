import { test, expect } from '@playwright/test';

test.describe('Робота з вкладками та фреймами', () => {
  test('відкриття посилання в новій вкладці', async ({
    page,
    context,
  }) => {
    await page.goto('/windows');

    const newPagePromise = context.waitForEvent('page');

    await page.getByRole('link', { name: 'Click Here' }).click();

    const newPage = await newPagePromise;

    await expect(newPage.locator('h3')).toHaveText('New Window');

    await expect(page.locator('h3'))
      .toHaveText('Opening a new window');

    await newPage.close();
  });

  test('введення тексту у редакторі iframe', async ({ page }) => {
    await page.goto('/iframe');

    const editor = page
      .frameLocator('#mce_0_ifr')
      .locator('#tinymce');

    await editor.fill('Текст, уведений автоматизованим тестом');

    await expect(editor)
      .toContainText('Текст, уведений автоматизованим тестом');
  });
});