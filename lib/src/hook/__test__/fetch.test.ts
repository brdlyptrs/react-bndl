import { describe, expect, it } from '@jest/globals';

import { spyOnScriptMethod } from './__mocks__';
import { fetchBundle } from '../fetch';

function removeNode(node:Node, nodes:Node[]) {
  let i = nodes.length;
  let found = false;
  while (--i > 0 && !found) {
    found = nodes[i] === node;
    if (found){
      nodes.splice(i, 1);
    }
  }
  return node;
}


describe('fetchBundle', () => {
  const nodes:Node[] = [];

  const spyOnAppend = jest.spyOn(document.head, 'appendChild')
    .mockImplementation((node:Node):Node => {
      nodes.push(node);
      return node;
    });

  const spyOnRemove = jest.spyOn(document.head,'removeChild')
    .mockImplementation(node => removeNode(node, nodes));

  const spyOnLoad = spyOnScriptMethod('onload');
  const spyOnError = spyOnScriptMethod('onerror');

  it('should resolve when onload is called', async () => {
    const eventOnLoad = new Event('Loaded Script');

    spyOnLoad.set.mockImplementationOnce((callback:(any) => void) => {
      callback(eventOnLoad);
    });

    await expect(fetchBundle('./test.js')).resolves.toBe(eventOnLoad);

    expect(spyOnAppend).toHaveBeenCalled();
    expect(spyOnRemove).toHaveBeenCalled();
  });

  it('should reject when onerror is called', async () => {
    spyOnError.set.mockImplementationOnce((callback:(any) => void) => {
      callback(new Error('Invalid Script'));
    });

    await expect(fetchBundle('./test.js')).rejects.toThrow('Invalid Script');

    expect(spyOnAppend).toHaveBeenCalled();
    expect(spyOnRemove).toHaveBeenCalled();
  });

  it('should reject when internal error is caught', async () => {
    const errorInternal  = new Error('Invalid Script');

    spyOnLoad.set.mockImplementationOnce((callback:(any) => void) => {
      callback(new Event('Loaded Script'));
    });

    spyOnRemove.mockImplementationOnce(() => { throw errorInternal; });

    await expect(fetchBundle('./test.js')).rejects.toThrow(errorInternal.message);
  });

});