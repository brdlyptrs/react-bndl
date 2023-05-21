import * as React from 'react';

interface IProps {
  component: any
  children?: any
  [key:string]: any
}

export function DynamicComponent({ component, children, ...props }:IProps) {
  return React.createElement(component, props, children);
}