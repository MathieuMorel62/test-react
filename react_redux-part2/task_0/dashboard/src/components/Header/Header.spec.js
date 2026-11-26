import { screen, fireEvent, waitFor } from '@testing-library/react';
import { StyleSheetTestUtils } from 'aphrodite';
import { renderWithProviders } from '../../test-utils';
import Header from './Header';

const loggedInState = {
  auth: {
    user: { email: 'test@test.com', password: 'password123' },
    isLoggedIn: true,
  },
};

test('should contain a heading and an image', async () => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  renderWithProviders(<Header />);
  const heading = screen.getByRole('heading', { name: /school dashboard/i });
  expect(heading).toBeInTheDocument();
  expect(screen.getByAltText('holberton logo')).toBeInTheDocument();
  await waitFor(() => {
    expect(heading).toHaveStyle({ color: 'rgb(225, 0, 60)' });
  });
});

test('logoutSection is not rendered when user is logged out', () => {
  renderWithProviders(<Header />);
  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
});

test('logoutSection is rendered when user is logged in', () => {
  renderWithProviders(<Header />, { preloadedState: loggedInState });
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
  expect(screen.getByText('test@test.com')).toBeInTheDocument();
});

test('clicking logout resets the authentication state', () => {
  const { store } = renderWithProviders(<Header />, { preloadedState: loggedInState });
  fireEvent.click(screen.getByText(/logout/i));
  expect(store.getState().auth).toEqual({
    user: { email: '', password: '' },
    isLoggedIn: false,
  });
  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
});
