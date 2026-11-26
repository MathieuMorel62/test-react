import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';

function renderWithProviders(ui, { preloadedState } = {}) {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  });

  return {
    store,
    ...render(<Provider store={store}>{ui}</Provider>),
  };
}

const loggedInState = {
  auth: {
    user: { email: 'test@test.com', password: 'password123' },
    isLoggedIn: true,
  },
};

test('should contain a heading and an image', () => {
  renderWithProviders(<Header />);

  const heading = screen.getByRole('heading', {
    name: /school dashboard/i
  });

  expect(heading).toBeInTheDocument();
  expect(screen.getByAltText('holberton logo')).toBeInTheDocument();
  expect(heading.className).toMatch(/h1_/);
});

test('logoutSection is not rendered when user is logged out', () => {
  renderWithProviders(<Header />);

  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
});

test('logoutSection is rendered when user is logged in', () => {
  renderWithProviders(<Header />, {
    preloadedState: loggedInState
  });

  expect(screen.getByText(/logout/i)).toBeInTheDocument();
  expect(screen.getByText('test@test.com')).toBeInTheDocument();
});

test('clicking logout resets the authentication state', () => {
  const { store } = renderWithProviders(<Header />, {
    preloadedState: loggedInState
  });

  fireEvent.click(screen.getByText(/logout/i));

  expect(store.getState().auth).toEqual({
    user: { email: '', password: '' },
    isLoggedIn: false,
  });

  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
});
