import { test, expect } from '@playwright/test';

test.describe('Role-Based Access Control & Security Verification', () => {
  test('Unauthenticated user attempting to access Super Admin dashboard triggers 401 Unauthorized screen', async ({ page }) => {
    // Clear localStorage to simulate unauthenticated request
    await page.addInitScript(() => {
      window.localStorage.clear();
    });

    await page.goto('/dashboard/super');
    await expect(page.getByText('401 — Authentication Required')).toBeVisible();
    await expect(page.getByText('Go to Login')).toBeVisible();
  });

  test('Student user attempting to access Super Admin dashboard triggers 403 Forbidden screen', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('vedhkrit_access_token', 'mock_student_token');
      window.localStorage.setItem(
        'vedhkrit_auth_user',
        JSON.stringify({ id: 'student-1', name: 'Student Test', role: 'student' })
      );
      window.localStorage.setItem('vedhkrit_role', 'student');
    });

    await page.goto('/dashboard/super');
    await expect(page.getByText('403 — Access Forbidden')).toBeVisible();
    await expect(page.getByText('Return to Dashboard')).toBeVisible();
  });

  test('Super Admin user possesses universal access across Super Admin control center', async ({ page }) => {
    await page.addInitScript(() => {
      window.localStorage.setItem('vedhkrit_access_token', 'mock_super_token');
      window.localStorage.setItem(
        'vedhkrit_auth_user',
        JSON.stringify({ id: 'super-1', name: 'Vedhkrit Ops', role: 'super' })
      );
      window.localStorage.setItem('vedhkrit_role', 'super');
    });

    await page.goto('/dashboard/super');
    await expect(page.getByText('Platform Control Center')).toBeVisible();
  });
});
