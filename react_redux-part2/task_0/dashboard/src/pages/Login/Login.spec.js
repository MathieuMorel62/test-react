
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/authSlice';
import Login from './Login';

function renderLogin() {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <Login />
      </Provider>
    ),
  };
}

test('testing signin form elements', () => {
  const { container } = renderLogin();

  const inputElements = container.querySelectorAll(
    'input[type="email"], input[type="text"], input[type="password"]'
  );

  const emailLabelElement = screen.getByLabelText(/email/i);
  const passwordLabelElement = screen.getByLabelText(/password/i);
  const buttonElementText = screen.getByRole('button', { name: 'OK' });

  expect(inputElements.length).toBeGreaterThanOrEqual(2);
  expect(emailLabelElement).toBeInTheDocument();
  expect(passwordLabelElement).toBeInTheDocument();
  expect(buttonElementText).toBeInTheDocument();
});

test('it should check that the email input element will be focused whenever the associated label is clicked', async () => {
  renderLogin();

  const emailInput = screen.getByLabelText('Email');
  const emailLabel = screen.getByText('Email');

  await userEvent.click(emailLabel);

  await waitFor(() => {
    expect(emailInput).toHaveFocus();
  });
});

test('it should check that the password input element will be focused whenever the associated label is clicked', async () => {
  renderLogin();

  const passwordLabel = screen.getByText('Password');
  const passwordInput = screen.getByLabelText('Password');

  await userEvent.click(passwordLabel);

  await waitFor(() => {
    expect(passwordInput).toHaveFocus();
  });
});

test('submit button is disabled by default', () => {
  renderLogin();

  const submitButton = screen.getByText('OK');

  expect(submitButton).toBeDisabled();
});

test('submit button is enabled only with a valid email and password of at least 8 characters', () => {
  renderLogin();

  const emailInput = screen.getByLabelText('Email');
  const passwordInput = screen.getByLabelText('Password');
  const submitButton = screen.getByText('OK');

  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(passwordInput, {
    target: { value: '123' },
  });

  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, {
    target: { value: 'test.com' },
  });
  fireEvent.change(passwordInput, {
    target: { value: '12345678' },
  });

  expect(submitButton).toBeDisabled();

  fireEvent.change(emailInput, {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(passwordInput, {
    target: { value: '12345678' },
  });

  expect(submitButton).not.toBeDisabled();
});

test('should update Redux authentication state on form submission', () => {
  const { store } = renderLogin();

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, {
    target: { value: 'test@test.com' },
  });

  fireEvent.change(passwordInput, {
    target: { value: 'password123' },
  });

  const submitButton = screen.getByRole('button', { name: /ok/i });

  fireEvent.click(submitButton);

  expect(store.getState().auth).toEqual({
    user: {
      email: 'test@test.com',
      password: 'password123',
    },
    isLoggedIn: true,
  });
});
