
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';
import Footer from './Footer';

function renderFooter(user, isLoggedIn) {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user,
        isLoggedIn,
      },
    },
  });

  return render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );
}

test('It should render footer with copyright text', () => {
  const defaultUser = {
    email: '',
    password: '',
  };

  renderFooter(defaultUser, false);

  const footerParagraph = screen.getByText(/copyright/i);

  expect(footerParagraph).toHaveTextContent(
    new RegExp(`copyright ${new Date().getFullYear()}`, 'i')
  );

  expect(footerParagraph).toHaveTextContent(/holberton school/i);
});

test('Contact us link is not displayed when user is logged out', () => {
  const loggedOutUser = {
    email: '',
    password: '',
  };

  renderFooter(loggedOutUser, false);

  const contactLink = screen.queryByText(/contact us/i);

  expect(contactLink).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  const loggedInUser = {
    email: 'test@test.com',
    password: 'password123',
  };

  renderFooter(loggedInUser, true);

  const contactLink = screen.getByText(/contact us/i);

  expect(contactLink).toBeInTheDocument();
});
