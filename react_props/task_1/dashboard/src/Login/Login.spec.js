import { render, screen, fireEvent } from '@testing-library/react'
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

test('inputs get focused when the related label is clicked', () => {
  render(<Login />)

  const emailInput = screen.getByLabelText(/email/i)
  const passwordInput = screen.getByLabelText(/password/i)

  fireEvent.click(screen.getByText(/email/i))
  expect(emailInput).toHaveFocus()

  fireEvent.click(screen.getByText(/password/i))
  expect(passwordInput).toHaveFocus()
})