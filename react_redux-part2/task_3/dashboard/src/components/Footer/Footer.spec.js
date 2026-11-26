import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Footer from './Footer';
import authReducer, { initialState } from '../../features/auth/authSlice';

const renderFooter = (isLoggedIn = false) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: { ...initialState, isLoggedIn },
    },
  });

  return render(
    <Provider store={store}>
      <Footer />
    </Provider>
  );
};

test('It should render footer with copyright text', () => {
  renderFooter();

  const footerParagraph = screen.getByText(/copyright/i);

  expect(footerParagraph).toHaveTextContent(new RegExp(`copyright ${(new Date()).getFullYear()}`, 'i'))
  expect(footerParagraph).toHaveTextContent(/holberton school/i)
});

test('Contact us link is not displayed when user is logged out', () => {
  renderFooter(false);

  const contactLink = screen.queryByText(/contact us/i);
  expect(contactLink).not.toBeInTheDocument();
});

test('Contact us link is displayed when user is logged in', () => {
  renderFooter(true);

  const contactLink = screen.getByText(/contact us/i);
  expect(contactLink).toBeInTheDocument();
});
