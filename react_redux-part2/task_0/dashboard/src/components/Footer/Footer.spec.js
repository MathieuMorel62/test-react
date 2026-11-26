import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import Footer from './Footer';

test('It should render footer with copyright text', () => {
  renderWithProviders(<Footer />);
  const footer = screen.getByText(/copyright/i);
  expect(footer).toHaveTextContent(new RegExp(`copyright ${new Date().getFullYear()}`, 'i'));
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
        user: { email: 'test@test.com', password: 'password123' },
        isLoggedIn: true,
      },
    },
  });
  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});
