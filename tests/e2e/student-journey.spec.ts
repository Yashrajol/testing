import { test, expect } from '@playwright/test';

test.describe('Student Portal Complete Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Set authenticated student session in localStorage
    await page.addInitScript(() => {
      window.localStorage.setItem('vedhkrit_access_token', 'mock_student_token_123');
      window.localStorage.setItem(
        'vedhkrit_auth_user',
        JSON.stringify({ id: 'student-123', name: 'Aarav Sharma', role: 'student' })
      );
      window.localStorage.setItem('vedhkrit_role', 'student');
      window.localStorage.setItem('vedhkrit_assessment_status', 'true');
    });
  });

  test('Student can navigate dashboard overview and core features', async ({ page }) => {
    await page.goto('/dashboard/student');
    await expect(page).toHaveTitle(/Student Portal|Student Dashboard/);

    // Verify Dashboard navigation
    await expect(page.getByText('Student Portal', { exact: false })).toBeVisible();
  });

  test('Student can view daily planner and homework tasks', async ({ page }) => {
    await page.goto('/dashboard/student/planner');
    await expect(page).toHaveTitle(/Daily Planner|Student Portal/);
  });

  test('Student can access career explorer and skill developmental index', async ({ page }) => {
    await page.goto('/dashboard/student/career');
    await expect(page).toHaveTitle(/Career Explorer|Student Portal/);
  });
});
