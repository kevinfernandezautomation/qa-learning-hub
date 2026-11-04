import { test, expect } from '@playwright/test';

test('SWR-006 export flow produces visible confirmation', async ({ page }) => {
  await page.goto('/medreview-trainer.html');
  await page.getByRole('button', { name: /Export report/i }).click();
  // In a production-like lab, replace alert handling with a test endpoint/query
  // that verifies the AuditEvent persisted by the C#/.NET backend.
  await expect(page.getByRole('heading', { name: /Export preview/i })).toBeVisible();
});
