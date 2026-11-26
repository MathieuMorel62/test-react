import { render, screen } from '@testing-library/react';
import Footer from './Footer';
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

test('It should render footer with copyright text', () => {
  renderWithProviders(<Footer />);

  const footer = screen.getByText(/copyright/i);

  expect(footer).toHaveTextContent(
    new RegExp(`copyright ${new Date().getFullYear()}`, 'i')
  );

  expect(footer).toHaveTextContent(/holberton school/i);
});

test('Contact us link is not displayed when user is logged out', () => {
  renderWithProviders(<Footer />);

  expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  renderWithProviders(<Footer />, {
    preloadedState: {
      auth: {
        user: {
          email: 'test@test.com',
          password: 'password123'
        },
        isLoggedIn: true,
      },
    },
  });

  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});
