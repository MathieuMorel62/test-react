import { fireEvent, render, screen } from '@testing-library/react'
import Header from './Header'
import AppContext from '../Context/context'

test('renders School Dashboard h1', () => {
  render(<Header />)
  const h1 = screen.getByRole('heading', { name: /School dashboard/i })
  const image = screen.getByAltText(/Holberton logo/i)
  expect(image).toBeInTheDocument()
  expect(h1).toBeInTheDocument()
})

test('does not render the logout section with the default context value', () => {
  render(<Header />)

  expect(screen.queryByText(/logout/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument()
})

test('renders the logout section for a logged-in user', () => {
  const user = {
    email: 'student@example.com',
    password: 'password123',
    isLoggedIn: true,
  }

  render(
    <AppContext.Provider value={{ user, logOut: jest.fn() }}>
      <Header />
    </AppContext.Provider>
  )

  expect(screen.getByText('Welcome student@example.com')).toBeInTheDocument()
  const logoutSection = screen.getByText(/logout/i).parentElement

  expect(screen.getByText(/logout/i)).toBeInTheDocument()
  expect(logoutSection).toHaveAttribute('id', 'logoutSection')
})

test('calls the context logOut function when the logout link is clicked', () => {
  const logOut = jest.fn()
  const user = {
    email: 'student@example.com',
    password: 'password123',
    isLoggedIn: true,
  }

  render(
    <AppContext.Provider value={{ user, logOut }}>
      <Header />
    </AppContext.Provider>
  )

  fireEvent.click(screen.getByText(/logout/i))

  expect(logOut).toHaveBeenCalledTimes(1)
})