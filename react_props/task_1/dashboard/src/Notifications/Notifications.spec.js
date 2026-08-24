import { fireEvent, render, screen } from '@testing-library/react'
import Notifications from './Notifications'

test('renders notifications title', () => {
  render(<Notifications />)
  expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument()
})

test('renders notifications button', () => {
  render(<Notifications />)
  expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
})

test('renders three notification items', () => {
  render(<Notifications />)
  expect(screen.getAllByRole('listitem')).toHaveLength(3)
})

test('clicking close button logs message', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {})

  render(<Notifications />)
  fireEvent.click(screen.getByRole('button', { name: /close/i }))

  expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked')
  consoleSpy.mockRestore()
})
