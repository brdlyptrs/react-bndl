import { test, expect } from '@playwright/experimental-ct-react';

import { BundleComponent } from '../../../dist/index.mjs';

test.use({ viewport: { width: 500, height: 500 } });

test.describe('BundleComponent', () => {
  const bundleName = '@example/foo';
  const bundlePath = '/foo.js';

  test('should load bundle and render default component', async ({ mount, page }) => {

    const route = page.route(bundlePath, async route => {
      const bundle = `
        window["${bundleName}"] = {
          default: function Test() {
            return createElement('div', null, 'foo');
          }
        };
      `;

      await route.fulfill({
          contentType: 'application/javascript',
          body: bundle
      });
    });

    const component = await mount(<BundleComponent path={bundlePath} name={bundleName} />);

    await route;

    await component.getByText('foo').waitFor();
    await expect(component).toContainText('foo');
  });

  test('should load bundle and render foo component', async ({ mount, page }) => {

    const route = page.route(bundlePath, async route => {
      const bundle = `
        window["${bundleName}"] = {
          foo: function Test() {
            return createElement('div', null, 'foo');
          }
        };
      `;

      await route.fulfill({
        contentType: 'application/javascript',
        body: bundle
      });
    });

    const component = await mount(<BundleComponent path={bundlePath} name={bundleName} component="foo"/>);

    await route;

    await component.getByText('foo').waitFor();
    await expect(component).toContainText('foo');
  });

});