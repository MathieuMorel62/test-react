
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from './Header';
import authReducer from '../../features/auth/authSlice';

const defaultState = {
  user: {
    email: '',
    password: '',
  },
  isLoggedIn: false,
};

const loggedInState = {
  user: {
    email: 'test@test.com',
    password: 'password123',
  },
  isLoggedIn: true,
};

function renderHeader(authState = defaultState) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: authState,
    },
  });

  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  return store;
}

test('should contain an h1 and an img element', () => {
  renderHeader();

  const headingElement = screen.getByRole('heading', {
    name: /school dashboard/i,
  });

  const imgElement = screen.getByAltText('holberton logo');

  expect(headingElement).toBeInTheDocument();
  expect(headingElement.className).toMatch(/h1_/);
  expect(imgElement).toBeInTheDocument();
});

test('logoutSection is not rendered with default context value', () => {
  renderHeader();

  const logoutSection = screen.queryByText(/logout/i);

  expect(logoutSection).not.toBeInTheDocument();
});

test('logoutSection is rendered when user is logged in', () => {
  renderHeader(loggedInState);

  const logoutSection = screen.getByText(/logout/i);

  expect(logoutSection).toBeInTheDocument();
  expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
});

test('clicking logout link updates the Redux state', () => {
  const store = renderHeader(loggedInState);

  const logoutLink = screen.getByText(/logout/i);

  fireEvent.click(logoutLink);

  expect(store.getState().auth.isLoggedIn).toBe(false);
  expect(store.getState().auth.user.email).toBe('');
  expect(store.getState().auth.user.password).toBe('');
  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
});
