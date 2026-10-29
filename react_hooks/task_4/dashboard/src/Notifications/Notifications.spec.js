import { fireEvent, render, screen } from '@testing-library/react'
import Notifications from './Notifications'
import NotificationItem from './NotificationItem'

jest.mock('./NotificationItem', () => jest.fn(({ markAsRead, value }) => (
  <li onClick={markAsRead}>{value}</li>
)))
  const notificationsList = [
    { id: 1, type: 'default', value: 'New course available' },
    { id: 2, type: 'urgent', value: 'New resume available' },
    { id: 3, type: 'urgent', value: 'New data available' },
  ]


test('display drawer prop set to false', ()=>{
  const {container} = render(<Notifications />)
  const button = container.querySelector('button')
  const paragraph = screen.queryByText('Here is the list of notifications')
  const yourNotif = screen.getByText('Your Notifications')
  expect(yourNotif).toBeInTheDocument()
  expect(paragraph).not.toBeInTheDocument()
  expect(button).not.toBeInTheDocument(undefined)
  expect(NotificationItem).not.toHaveBeenCalled()

})

test('display drawer prop set to true, notifications is empty', ()=>{
  const {container} = render(<Notifications displayDrawer={true} notifications={[]} />)
  const button = container.querySelector('button')
  const paragraph = screen.getByText('No new notification for now')
  const yourNotif = screen.getByText('Your Notifications')
  expect(yourNotif).toBeInTheDocument()
  expect(paragraph).toBeInTheDocument()
  expect(button).not.toBeInTheDocument()
  expect(NotificationItem).not.toHaveBeenCalled()
})

test('display drawer prop set to true, notifications are full', ()=>{
  const {container} = render(<Notifications notifications={notificationsList} displayDrawer={true}/>)
  const button = container.querySelector('button')
  const paragraph = screen.getByText('Here is the list of notifications')
  const yourNotif = screen.getByText('Your Notifications')
  expect(yourNotif).toBeInTheDocument()
  expect(paragraph).toBeInTheDocument()
  expect(button).toBeInTheDocument()
  expect(NotificationItem).toHaveBeenCalled()

})

test('clicking the menu item calls handleDisplayDrawer', () => {
  const handleDisplayDrawer = jest.fn()

  render(
    <Notifications
      handleDisplayDrawer={handleDisplayDrawer}
    />
  )

  fireEvent.click(screen.getByText('Your Notifications'))

  expect(handleDisplayDrawer).toHaveBeenCalledTimes(1)
})

test('clicking the close button calls handleHideDrawer', () => {
  const handleHideDrawer = jest.fn()

  render(
    <Notifications
      displayDrawer={true}
      notifications={notificationsList}
      handleHideDrawer={handleHideDrawer}
    />
  )

  fireEvent.click(screen.getByRole('button', { name: 'Close' }))

  expect(handleHideDrawer).toHaveBeenCalledTimes(1)
})

test('calls markNotificationAsRead with the notification id', () => {
  const markNotificationAsRead = jest.fn()

  render(
    <Notifications
      displayDrawer={true}
      notifications={notificationsList}
      markNotificationAsRead={markNotificationAsRead}
    />
  )

  fireEvent.click(screen.getByText('New resume available'))

  expect(markNotificationAsRead).toHaveBeenCalledWith(2)
})