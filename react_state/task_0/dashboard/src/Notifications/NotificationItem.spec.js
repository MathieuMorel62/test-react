import { fireEvent, render, screen } from '@testing-library/react'
import NotificationItem from './NotificationItem'

test('calls markAsRead when clicked', () => {
  const markAsRead = jest.fn()

  render(<NotificationItem value='New course available' markAsRead={markAsRead} />)
  fireEvent.click(screen.getByText('New course available'))

  expect(markAsRead).toHaveBeenCalledTimes(1)
})

test('renders good color depending on default type', () => {
  render(<NotificationItem  type='default' />)
  const li = document.querySelector('li')
  expect(li).toHaveClass('text-[var(--default-notification-item)]')
})

test('renders good color depending on urgent type', () => {
  render(<NotificationItem  type='urgent' />)
  const li = document.querySelector('li')
  expect(li).toHaveClass('text-[var(--urgent-notification-item)]')
})