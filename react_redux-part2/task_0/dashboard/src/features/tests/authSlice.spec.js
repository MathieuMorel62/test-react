import authReducer, { initialState, login, logout } from '../auth/authSlice'

describe('authSlice', () => {
  test('returns the correct initial state by default', () => {
    expect(authReducer(undefined, { type: '@@INIT' })).toEqual(initialState)
  })

  test('updates the state correctly with login', () => {
    const state = authReducer(
      initialState,
      login({
        email: 'student@example.com',
        password: 'password123',
      })
    )

    expect(state.user.email).toBe('student@example.com')
    expect(state.user.password).toBe('password123')
    expect(state.isLoggedIn).toBe(true)
  })

  test('isLoggedIn is false in the initial state', () => {
    expect(initialState.user.isLoggedIn).toBe(false)
  })

  test('resets the state correctly with logout', () => {
    const loggedInState = authReducer(
      initialState,
      login({
        email: 'student@example.com',
        password: 'password123',
      })
    )

    const state = authReducer(loggedInState, logout())

    expect(state.user.email).toBe('')
    expect(state.user.password).toBe('')
    expect(state.isLoggedIn).toBe(false)
  })
})