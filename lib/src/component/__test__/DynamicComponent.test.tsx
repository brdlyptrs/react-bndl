import React from 'react';

import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, it, expect } from '@jest/globals';

import { DynamicComponent } from '../DynamicComponent';

describe('DynamicComponent', () => {

  afterEach(() => {
    cleanup();
  });

  it('should render div element and children', async () => {
    const{ getByText } = render(
      <DynamicComponent component="div">
                foo
      </DynamicComponent>
    );

    expect(getByText('foo')).toBeTruthy();
  });

  it('should render element and children along with supplying props', async () => {
    const { getByTestId } = render(
      <DynamicComponent component="div" data-testid="foo" id="foo">
                bar
      </DynamicComponent>
    );

    const element = getByTestId('foo');
    // Issue with extending expect that does not get registered with typescript server
    expect(element).toHaveAttribute('id', 'foo');
  });

});