import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BundleComponent } from '@bndl/lib';

export const ExampleRoutes = () => {
  return (
    <Routes>
      <Route path="about"  element={
        <BundleComponent
          path="./assets/about.js"
          name="@app/about"
        />
      }
      />
      <Route path="/*"  element={
        <BundleComponent
          path="./assets/home.js"
          name="@app/home"
        />
      }
      />
    </Routes>
  );
};