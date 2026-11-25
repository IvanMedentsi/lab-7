import { test, expect } from '@playwright/test';

test.describe('Нескінченне прокручування — варіант 7', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/infinite_scroll');
    await page.waitForLoadState('networkidle');
  });
test('кількість динамічних блоків збільшується щонайменше втричі', async ({
  page,
}) => {
  const blocks = page.locator('.jscroll-added');

  const initialCount = await blocks.count();
  expect(initialCount).toBeGreaterThan(0);

  const targetCount = initialCount * 3;

  for (let i = 0; i < 15; i++) {
    const currentCount = await blocks.count();

    if (currentCount >= targetCount) {
      break;
    }

    // Прокручуємо сторінку до самого низу
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    // Повторно прокручуємо під час очікування,
    // щоб активувати наступне завантаження
    await expect.poll(
      async () => {
        await page.evaluate(() => {
          window.scrollTo(0, document.body.scrollHeight);
        });

        return await blocks.count();
      },
      { timeout: 10_000 }
    ).toBeGreaterThan(currentCount);
  }

  const finalCount = await blocks.count();

  console.log(`Початкова кількість: ${initialCount}`);
  console.log(`Кінцева кількість: ${finalCount}`);

  expect(finalCount).toBeGreaterThanOrEqual(targetCount);
});

  test('після прокручування додаються нові блоки', async ({ page }) => {
    const blocks = page.locator('.jscroll-added');

    const initialCount = await blocks.count();

    await page.mouse.wheel(0, 1000);

    await expect.poll(
      async () => blocks.count(),
      { timeout: 10_000 }
    ).toBeGreaterThan(initialCount);
  });
});