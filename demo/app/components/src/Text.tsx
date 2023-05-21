import React from 'react';

interface IProps {
  children?: any
}

export function Text({ children }:IProps) {
  return(
    <div>
      <h4>Component: Text</h4>
      <p>{ children }</p>
    </div>
  );
}