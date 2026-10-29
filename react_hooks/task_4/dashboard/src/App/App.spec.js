import { render, act, fireEvent, screen } from '@testing-library/react'
import App from './App'
import Login from '../Login/Login'
import CourseList from '../CourseList/CourseList'

jest.mock('../Login/Login', () => jest.fn(() => null))
jest.mock('../CourseList/CourseList', () => jest.fn(() => null))

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders the login component by default', () => {
    render(<App />)

    expect(Login).toHaveBeenCalled()
    expect(CourseList).not.toHaveBeenCalled()
  })

  test('renders school news block by default', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /news from the school/i })).toBeInTheDocument()
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument()
  })

  test('updates the interface after login', () => {
    render(<App />)

    const { logIn } = Login.mock.calls[0][0]
    act(() => {
      logIn('student@example.com', 'long-enough-password')
    })

    expect(CourseList).toHaveBeenCalled()
    expect(screen.getByText(/welcome student@example.com/i)).toBeInTheDocument()
    expect(screen.getByText(/logout/i)).toBeInTheDocument()
  })

  test('updates the interface after logout', () => {
    render(<App />)

    const { logIn } = Login.mock.calls[0][0]
    act(() => {
      logIn('student@example.com', 'long-enough-password')
    })

    fireEvent.click(screen.getByText(/logout/i))

    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument()
    expect(Login).toHaveBeenCalledTimes(2)
  })

  test('logs out when ctrl+h is pressed', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
    render(<App />)

    const { logIn } = Login.mock.calls[0][0]
    act(() => {
      logIn('student@example.com', 'long-enough-password')
    })

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", {
        key: "h",
        code: "h",
        ctrlKey: true,
        bubbles: true,
      }))
    })

    expect(alertSpy).toHaveBeenCalledWith("Logging you out")
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument()
    alertSpy.mockRestore()
  })

  test('removes a notification and logs when it is marked as read', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

    try {
      render(<App />)
      fireEvent.click(screen.getByText('Your Notifications'))
      expect(screen.getByText('New resume available')).toBeInTheDocument()

      fireEvent.click(screen.getByText('New resume available'))

      expect(consoleSpy).toHaveBeenCalledWith(
        'Notification 2 has been marked as read'
      )
      expect(screen.queryByText('New resume available')).not.toBeInTheDocument()
      expect(screen.getByText('New course available')).toBeInTheDocument()
      expect(screen.getByText('New data available')).toBeInTheDocument()
    } finally {
      consoleSpy.mockRestore()
    }
  })
})