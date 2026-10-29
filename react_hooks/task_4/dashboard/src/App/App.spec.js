import { render, act, fireEvent, screen } from '@testing-library/react'
import App from './App'
import Login from '../Login/Login'
import CourseList from '../CourseList/CourseList'

jest.mock('../Login/Login', () => jest.fn(() => null))
jest.mock('../CourseList/CourseList', () => jest.fn(() => null))

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'log').mockImplementation(() => {})
    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.spyOn(console, 'warn').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
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


  test('removes a notification and logs when it is marked as read', () => {
    render(<App />)
    fireEvent.click(screen.getByText('Your notifications'))
    expect(screen.getByText('New resume available')).toBeInTheDocument()

    fireEvent.click(screen.getByText('New resume available'))

    expect(console.log).toHaveBeenCalledWith(
      'Notification 2 has been marked as read'
    )
    expect(screen.queryByText('New resume available')).not.toBeInTheDocument()
    expect(screen.getByText('New course available')).toBeInTheDocument()
    expect(screen.getByText('New data available')).toBeInTheDocument()
  })

  test('opens and closes the notification drawer', () => {
    render(<App />)

    fireEvent.click(screen.getByText('Close'))
    expect(screen.queryByText('Here is the list of notifications')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Your notifications'))
    expect(screen.getByText('Here is the list of notifications')).toBeInTheDocument()
  })

})