import { render, act, screen } from '@testing-library/react'
import App from './App'
import Login from '../Login/Login'
import CourseList from '../CourseList/CourseList'

jest.mock('../Login/Login', () => jest.fn(() => null))
jest.mock('../CourseList/CourseList', () => jest.fn(() => null))

describe('App', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('isLoggedIn is false', () => {
    render(<App />)
    expect(Login).toHaveBeenCalled()
    expect(CourseList).not.toHaveBeenCalled()
  })

  test('renders school news block by default', () => {
    render(<App />)

    expect(screen.getByRole('heading', { name: /news from the school/i })).toBeInTheDocument()
    expect(screen.getByText(/holberton school news goes here/i)).toBeInTheDocument()
  })

  test('isLoggedIn is true', () => {
    render(<App isLoggedIn={true} />)
    expect(CourseList).toHaveBeenCalled()
    expect(Login).not.toHaveBeenCalled()
  })

  test('logout called when h and ctrl are pressed same time', () => {
    const logOut = jest.fn()
    render(<App logout={logOut} />)

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", {
        key: "h",
        code: "h",
        ctrlKey: true,
        bubbles: true,
      }))
    })

    expect(logOut).toHaveBeenCalled()
  })

  test('alert function is called ?', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
    render(<App />)

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", {
        key: "h",
        code: "h",
        ctrlKey: true,
        bubbles: true,
      }))
    })

    expect(alertSpy).toHaveBeenCalledWith("Logging you out")
    alertSpy.mockRestore()
  })
})