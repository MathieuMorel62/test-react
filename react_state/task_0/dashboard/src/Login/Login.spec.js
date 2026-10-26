import {render, screen} from '@testing-library/react'
import Login from './Login'
import userEvent from '@testing-library/user-event'

test('renders School Dashboard p', () => {
  render(<Login />)
  const pLogin = screen.getByText(/Login to access the full dashboard/i)
  const inputs = document.getElementsByTagName('input')
  const labels = document.getElementsByTagName('label')
  const button = document.getElementsByTagName('button')
  expect(labels.length).toEqual(2)
  expect(inputs.length).toEqual(2)
  expect(button.length).toEqual(1)
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