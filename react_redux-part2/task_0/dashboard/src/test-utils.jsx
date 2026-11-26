import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './app/rootReducer';

export function renderWithProviders(ui, { preloadedState, ...options } = {}) {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { ...options, wrapper: Wrapper }) };
}
