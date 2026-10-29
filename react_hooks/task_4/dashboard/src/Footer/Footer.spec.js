import { render, screen } from '@testing-library/react'
import Footer from './Footer'
import AppContext from '../Context/context'
import { getCurrentYear, getFooterCopy } from '../utils/utils'

const renderFooter = (user) => {
  const contextValue = {
    user,
    logOut: jest.fn(),
  }

  return render(
    <AppContext.Provider value={contextValue}>
      <Footer />
    </AppContext.Provider>
  )
}

test('renders Footer', () => {
  renderFooter({ email: '', password: '', isLoggedIn: false })

  expect(
    screen.getByText(
      new RegExp(`copyright\\s+${getCurrentYear()}\\s+-\\s+${getFooterCopy(true)}`, 'i')
    )
  ).toBeInTheDocument()
})

test('does not display the Contact us link when the user is logged out', () => {
  renderFooter({ email: '', password: '', isLoggedIn: false })

  expect(screen.queryByText('Contact us')).not.toBeInTheDocument()
})

test('displays the Contact us link when the user is logged in', () => {
  renderFooter({
    email: 'student@example.com',
    password: 'long-enough-password',
    isLoggedIn: true,
  })

  expect(screen.getByRole('link', { name: 'Contact us' })).toBeInTheDocument()
})