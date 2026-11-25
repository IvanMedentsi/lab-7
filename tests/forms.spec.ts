
import { test, expect } from '@playwright/test';

test.describe('Взаємодія з елементами форм', () => {
  test('вибір елемента у випадаючому списку', async ({ page }) => {
    await page.goto('/dropdown');

    const dropdown = page.locator('#dropdown');

    await dropdown.selectOption('2');

    await expect(dropdown).toHaveValue('2');
    await expect(dropdown.locator('option:checked'))
      .toHaveText('Option 2');
  });

  test('встановлення та зняття прапорців', async ({ page }) => {
    await page.goto('/checkboxes');

    const boxes = page.locator('#checkboxes input[type="checkbox"]');

    await expect(boxes).toHaveCount(2);

    await boxes.nth(0).check();
    await boxes.nth(1).uncheck();

    await expect(boxes.nth(0)).toBeChecked();
    await expect(boxes.nth(1)).not.toBeChecked();
  });

  test('керування горизонтальним повзунком', async ({ page }) => {
    await page.goto('/horizontal_slider');

    const slider = page.locator('input[type="range"]');

    await slider.focus();
    await slider.press('Home');

    for (let i = 0; i < 3; i++) {
      await slider.press('ArrowRight');
    }

    await expect(page.locator('#range')).toHaveText('1.5');
  });
});
