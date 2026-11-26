import { configureStore } from '@reduxjs/toolkit'
import mockAxios from 'jest-mock-axios'
import coursesReducer, { fetchCourses } from '../courses/coursesSlice'
import { logout } from '../auth/authSlice'

describe('coursesSlice', () => {
  afterEach(() => {
    mockAxios.reset()
  })

  test('returns the correct initial state by default', () => {
    expect(coursesReducer(undefined, { type: '@@INIT' })).toEqual({
      courses: [],
    })
  })

  test('fetches courses data correctly', async () => {
    const courses = [
      { id: 1, name: 'ES6' },
      { id: 2, name: 'Webpack' },
    ]

    const store = configureStore({
      reducer: { courses: coursesReducer },
    })

    const promise = store.dispatch(fetchCourses())

    mockAxios.mockResponse({
      data: { courses },
    })

    await promise

    expect(mockAxios.get).toHaveBeenCalledWith(
      'http://localhost:5173/courses.json'
    )
    expect(store.getState().courses.courses).toEqual(
      courses.map((course) => ({ ...course, isSelected: false }))
    )
  })

  test('clears courses when logout is dispatched', () => {
    const state = {
      courses: [
        { id: 1, name: 'ES6' },
      ],
    }

    const updatedState = coursesReducer(state, logout())

    expect(updatedState.courses).toEqual([])
  })
})