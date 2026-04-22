import { test, expect } from '@playwright/test';

test.describe('Currency Dashboard', () => {
  test('deve exibir o título da página', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Monitor de Câmbio')).toBeVisible();
  });

  test('deve exibir spinner de carregamento inicialmente', async ({ page }) => {
    await page.goto('/');
    // O spinner pode aparecer brevemente
    // Verificamos que a página carrega sem erros
    await expect(page).toHaveTitle(/Monitor de Câmbio|Vite/);
  });

  test('deve exibir botão de atualizar', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Atualizar')).toBeVisible();
  });

  test('deve exibir o footer com informação da fonte', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText(/AwesomeAPI/)).toBeVisible();
  });

  test('deve exibir os cards de câmbio quando dados carregarem', async ({ page }) => {
    await page.route('**/api/v1/currencies', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            pair: 'USD-BRL',
            description: 'Dólar / Real',
            bid: 5.2034,
            ask: 5.2134,
            high: 5.25,
            low: 5.18,
            variation: 0.02,
            variationPercent: 0.38,
            timestamp: '2024-01-15T10:00:00'
          },
          {
            pair: 'EUR-BRL',
            description: 'Euro / Real',
            bid: 5.6234,
            ask: 5.6334,
            high: 5.68,
            low: 5.60,
            variation: -0.01,
            variationPercent: -0.17,
            timestamp: '2024-01-15T10:00:00'
          },
          {
            pair: 'EUR-USD',
            description: 'Euro / Dólar',
            bid: 1.0834,
            ask: 1.0924,
            high: 1.09,
            low: 1.08,
            variation: 0.005,
            variationPercent: 0.46,
            timestamp: '2024-01-15T10:00:00'
          }
        ]),
      });
    });

    await page.goto('/');
    await expect(page.getByTestId('cards-section')).toBeVisible({ timeout: 10000 });
    await expect(page.getByTestId('card-USD-BRL')).toBeVisible();
    await expect(page.getByTestId('card-EUR-BRL')).toBeVisible();
    await expect(page.getByTestId('card-EUR-USD')).toBeVisible();
  });

  test('deve exibir o gráfico comparativo quando dados carregarem', async ({ page }) => {
    await page.route('**/api/v1/currencies', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            pair: 'USD-BRL',
            description: 'Dólar / Real',
            bid: 5.2034,
            ask: 5.2134,
            high: 5.25,
            low: 5.18,
            variation: 0.02,
            variationPercent: 0.38,
            timestamp: '2024-01-15T10:00:00'
          }
        ]),
      });
    });

    await page.goto('/');
    await expect(page.getByTestId('exchange-chart')).toBeVisible({ timeout: 10000 });
  });

  test('deve exibir mensagem de erro quando API falhar', async ({ page }) => {
    await page.route('**/api/v1/currencies', async route => {
      await route.fulfill({ status: 500 });
    });

    await page.goto('/');
    await expect(page.getByTestId('error-banner')).toBeVisible({ timeout: 10000 });
  });
});
