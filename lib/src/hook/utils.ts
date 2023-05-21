export function getComponent(data:any, component:string|string[]) {
  if (Array.isArray(component)) {
    return Object.keys(component)
      .reduce((obj, key)=> ({
        ...obj,
        [key]: data[key]
      }), {});
  } else if (typeof component === 'string') {
    return data[component];
  } else if (data.default) {
    return data.default;
  } else {
    throw new Error('Bundle does not export a component');
  }
}

export function getScope() {
  if (typeof globalThis === 'object' && globalThis)
    return globalThis;
  if (typeof window === 'object' && window)
    return window;
  if (typeof self === 'object' && self)
    return self;
  if (typeof global === 'object' && global)
    return global;
  else
    return Function('return this')();
}