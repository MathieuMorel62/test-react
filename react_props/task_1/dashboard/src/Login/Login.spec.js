import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'

test('renders 2 labels, 2 inputs and 1 button', () => {
  render(<Login />)

  const labels = document.getElementsByTagName('label')
  const inputs = document.getElementsByTagName('input')
  const buttons = document.getElementsByTagName('button')

  expect(labels.length).toEqual(2)
  expect(inputs.length).toEqual(2)
  expect(buttons.length).toEqual(1)
})

test('inputs get focus when their labels are clicked', async () => {
  const user = userEvent.setup()

  render(<Login />)

  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)

  const emailLabel = screen.getByText(/email/i)
  const passwordLabel = screen.getByText(/password/i)

  await user.click(emailLabel)
  expect(emailInput).toHaveFocus()

  await user.click(passwordLabel)
  expect(passwordInput).toHaveFocus()
})