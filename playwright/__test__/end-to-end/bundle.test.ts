import { test, expect, Page } from '@playwright/test';

let page:Page;

test.describe('Bundle', async () => {

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
    });

    test.describe('per view', () => {

        test.beforeAll(async () => {
            await page.goto('http://localhost:8080', { waitUntil: 'networkidle' });
        });

        test('should load home.js when navigating to site root', async () => {
            const element = await page.getByText('Page: Home');
            expect(element).toBeVisible();
        });

        test('should navigate to /about and load corresponding bundle', async () => {
            await page.getByRole('link', { name: 'About' }).click();
            await page.waitForLoadState('networkidle');

            const element = await page.getByText('Page: About');
            await element.waitFor({ state: 'visible' });

            expect(element).toBeVisible();
        });

    });

    test.describe('per component', () => {

        test.beforeAll(async () => {
            await page.goto('http://localhost:8080/hook', { waitUntil: 'networkidle' });
        });

        test('should load text component via useBundle hook', async () => {
            const element = await page.getByText('Component: Text');
            await element.waitFor();

            expect(element).toBeVisible();
        });

    });

});