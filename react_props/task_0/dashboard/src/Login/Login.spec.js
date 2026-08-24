import {render, screen} from '@testing-library/react'
import Login from './Login'

test('renders School Dashboard p', () => {
  render(<Login />)
  const pLogin = screen.getByText(/Login to access the full dashboard/i)

  expect(pLogin).toBeInTheDocument()
})