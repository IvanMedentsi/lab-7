
import { test, expect } from '@playwright/test';
import path from 'node:path';
import fs from 'node:fs';

test.describe('Файлові операції', () => {
  test('завантаження файлу на сервер', async ({ page }) => {
    await page.goto('/upload');

    const filePath = path.join(
      __dirname,
      'files',
      'upload-sample.txt'
    );

    await page.locator('#file-upload').setInputFiles(filePath);
    await page.locator('#file-submit').click();

    await expect(page.locator('#uploaded-files'))
      .toHaveText('upload-sample.txt');
  });

  test('завантаження файлу зі сторінки', async ({ page }) => {
  await page.goto('/download');

  // Знаходимо посилання на файл у блоці File Downloader
  const fileLink = page.locator('.example a').first();

  await expect(fileLink).toBeVisible();

  // Спочатку очікуємо подію завантаження
  const downloadPromise = page.waitForEvent('download');

  // Натискаємо на посилання
  await fileLink.click();

  const download = await downloadPromise;

  // Перевіряємо назву завантаженого файлу
  expect(download.suggestedFilename()).toBeTruthy();

  // Зберігаємо файл у папку результатів тесту
  const target = path.join(
    test.info().outputDir,
    download.suggestedFilename()
  );

  await download.saveAs(target);

  // Перевіряємо, що файл існує та не порожній
  expect(fs.existsSync(target)).toBe(true);
  expect(fs.statSync(target).size).toBeGreaterThan(0);
});
});
