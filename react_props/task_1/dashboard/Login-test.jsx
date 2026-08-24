import {fireEvent, render, screen} from '@testing-library/react'
import Login from './src/Login/Login'


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

test('inputs get focus when their labels are clicked', () => {
  render(<Login />)

  const emailInput = screen.getByLabelText('email:')
  const passwordInput = screen.getByLabelText('password:')

  fireEvent.click(screen.getByText('email:'))
  expect(emailInput).toHaveFocus()

  fireEvent.click(screen.getByText('password:'))
  expect(passwordInput).toHaveFocus()
})
