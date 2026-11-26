import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import Header from './Header';
import authReducer, { login } from '../../features/auth/authSlice';

const renderHeader = (isLoggedIn = false) => {
  const store = configureStore({
    reducer: { auth: authReducer },
  });

  if (isLoggedIn) {
    store.dispatch(login({
      email: 'test@test.com',
      password: 'password123',
    }));
  }

  const result = render(
    <Provider store={store}>
      <Header />
    </Provider>
  );

  return { store, ...result };
};

export const convertHexToRGBA = (hexCode) => {
  let hex = hexCode.replace('#', '');

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    console.log({hex})
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
};

test('should contain a <p/> element with specific text, <h1/>, and an <img/>', () => {
  renderHeader();

  const headingElement = screen.getByRole('heading', {name: /school Dashboard/i});
  const imgElement = screen.getByAltText('holberton logo')

  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveStyle({color: convertHexToRGBA('#e1003c') })
  expect(imgElement).toBeInTheDocument();
});

test('logoutSection is not rendered with default context value', () => {
  renderHeader();

  const logoutSection = screen.queryByText(/logout/i);

  expect(logoutSection).not.toBeInTheDocument();
});

test('logoutSection is rendered when user is logged in', () => {
  renderHeader(true);

  const logoutSection = screen.getByText(/logout/i);
  expect(logoutSection).toBeInTheDocument();
  expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
});

test('clicking logout link calls the logOut function', () => {
  const { store } = renderHeader(true);

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  expect(store.getState().auth.isLoggedIn).toBe(false);
  expect(store.getState().auth.user.email).toBe('');
});
