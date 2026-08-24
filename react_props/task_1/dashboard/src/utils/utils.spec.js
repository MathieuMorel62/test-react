import { getCurrentYear, getFooterCopy, getLatestNotification } from './utils'

describe('utils', () => {
	afterEach(() => {
		jest.useRealTimers()
	})

	test('getCurrentYear returns the correct year', () => {
		jest.useFakeTimers()
		jest.setSystemTime(new Date('2024-01-01T00:00:00Z'))

		expect(getCurrentYear()).toBe(2024)
	})

	test('getFooterCopy returns the correct string for true and false', () => {
		expect(getFooterCopy(true)).toBe('Holberton School')
		expect(getFooterCopy(false)).toBe('Holberton School main dashboard')
	})

	test('getLatestNotification returns the correct string', () => {
		expect(getLatestNotification()).toBe('<strong>Urgent requirement</strong> - complete by EOD')
	})
})
