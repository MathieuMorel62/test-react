import {render, screen} from '@testing-library/react'
import Login from './Login'
import userEvent from '@testing-library/user-event'

test('renders School Dashboard p', () => {
  render(<Login />)
  const pLogin = screen.getByText(/Login to access the full dashboard/i)
  const inputs = document.getElementsByTagName('input')
  const labels = document.getElementsByTagName('label')
  const submitInput = screen.getByRole('button', { name: 'OK' })
  expect(labels.length).toEqual(2)
  expect(inputs.length).toEqual(3)
  expect(submitInput).toBeInTheDocument()
  expect(pLogin).toBeInTheDocument()
})

test('inputs get focus when clicks on labels', async () => {
  render(<Login />)

  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const emailLabel = document.querySelector(`label[for="${emailInput.id}"]`)
  const passwordLabel = document.querySelector(`label[for="${passwordInput.id}"]`)

  await userEvent.click(emailLabel)
  expect(emailInput).toHaveFocus()

  await userEvent.click(passwordLabel)
  expect(passwordInput).toHaveFocus()
})

test('submit input is disabled by default', () => {
  render(<Login />)

  expect(screen.getByRole('button', { name: 'OK' })).toBeDisabled()
})

test('enables submit input only when valid email and password are provided', async () => {
  const user = userEvent.setup()
  render(<Login />)

  const submitInput = screen.getByRole('button', { name: 'OK' })
  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)

  await user.type(emailInput, 'student@example.com')
  expect(submitInput).toBeDisabled()

  await user.type(passwordInput, 'short')
  expect(submitInput).toBeDisabled()

  await user.clear(passwordInput)
  await user.type(passwordInput, 'long-enough-password')

  expect(submitInput).toBeEnabled()
})

test('submit stays disabled with invalid email addresses', async () => {
  const user = userEvent.setup();

  render(<Login />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitInput = screen.getByRole('button', { name: 'OK' });

  // Password is valid
  await user.type(passwordInput, 'password123');

  // Check invalid emails
  const invalidEmails = [
    'notanemail',
    'student@',
    '@example.com',
    'student@example',
  ];

  for (const invalidEmail of invalidEmails) {
    await user.clear(emailInput);
    await user.type(emailInput, invalidEmail);

    expect(submitInput).toBeDisabled();
  }

  // Check a valid email
  await user.clear(emailInput);
  await user.type(emailInput, 'student@example.com');

  expect(submitInput).toBeEnabled();
});

test('password must contain at least 8 characters', async () => {
  const user = userEvent.setup();

  render(<Login />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitInput = screen.getByRole('button', { name: 'OK' });

  await user.type(emailInput, 'student@example.com');

  await user.type(passwordInput, '1234567');
  expect(submitInput).toBeDisabled();

  await user.type(passwordInput, '8');
  expect(submitInput).toBeEnabled();
});