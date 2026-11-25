
import { test, expect } from '@playwright/test';

test.describe('Робота з таблицями', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tables');
  });

  test('перевірка кількості рядків таблиці', async ({ page }) => {
    const rows = page.locator('#table1 tbody tr');

    await expect(rows).toHaveCount(4);
  });

  test('пошук користувача та перевірка його даних', async ({ page }) => {
    const row = page.locator('#table1 tbody tr').filter({
      hasText: 'Conway',
    });

    await expect(row).toHaveCount(1);
    await expect(row.locator('td').nth(2))
      .toHaveText('tconway@earthlink.net');
    await expect(row.locator('td').nth(3))
      .toHaveText('$50.00');
  });

  test('сортування таблиці за прізвищем', async ({ page }) => {
    await page.locator('#table1 thead th').first().click();

    const names = await page.locator(
      '#table1 tbody tr td:first-child'
    ).allTextContents();

    expect(names).toEqual([...names].sort());
  });

  test('обчислення загальної суми рахунків', async ({ page }) => {
    const amounts = await page.locator(
      '#table1 tbody tr td:nth-child(4)'
    ).allTextContents();

    const total = amounts
      .map(text => Number(text.replace('$', '')))
      .reduce((sum, value) => sum + value, 0);

    expect(total).toBeCloseTo(251.00, 2);
  });
});
