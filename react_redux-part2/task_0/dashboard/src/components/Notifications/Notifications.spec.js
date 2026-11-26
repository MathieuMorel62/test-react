import { Profiler } from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import Notifications from './Notifications';

const notifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong>' } },
];

const preloadedState = { notifications: { notifications } };
const getDrawer = () => screen.getByText(/here is the list of notifications/i).parentElement;
const getMenu = () => screen.getByText(/your notifications/i);
const visibleClass = /(?:^|\s)visible_[^\s]+/;

function renderNotifications() {
  return renderWithProviders(<Notifications />, { preloadedState });
}

test('renders without crashing', () => {
  renderNotifications();
  expect(getMenu()).toBeInTheDocument();
  expect(screen.getByText('New course available')).toBeInTheDocument();
  expect(screen.getByText('New resume available')).toBeInTheDocument();
});

test('toggles drawer visibility when clicking the title', () => {
  renderNotifications();
  const drawer = getDrawer();
  expect(drawer.className).not.toMatch(visibleClass);
  fireEvent.click(getMenu());
  expect(drawer.className).toMatch(visibleClass);
  fireEvent.click(getMenu());
  expect(drawer.className).not.toMatch(visibleClass);
  expect(screen.getByText('New course available')).toBeInTheDocument();
});

test('closes drawer on close button', () => {
  renderNotifications();
  fireEvent.click(getMenu());
  expect(getDrawer().className).toMatch(visibleClass);
  fireEvent.click(screen.getByRole('button', { name: /close/i }));
  expect(getDrawer().className).not.toMatch(visibleClass);
});

test('marks notification as read', () => {
  const { store } = renderNotifications();
  fireEvent.click(getMenu());
  fireEvent.click(screen.getByText('New course available'));
  expect(screen.queryByText('New course available')).not.toBeInTheDocument();
  expect(store.getState().notifications.notifications).toHaveLength(2);
  expect(screen.getAllByRole('listitem', { hidden: true })).toHaveLength(2);
});

test('drawer starts hidden', () => {
  renderNotifications();
  expect(getDrawer().className).not.toMatch(visibleClass);
});

test('does not re-render when drawer visibility is toggled', () => {
  const onRender = jest.fn();
  renderWithProviders(
    <Profiler id="Notifications" onRender={onRender}>
      <Notifications />
    </Profiler>,
    { preloadedState }
  );
  const initialRenderCount = onRender.mock.calls.length;
  fireEvent.click(getMenu());
  expect(getDrawer().className).toMatch(visibleClass);
  fireEvent.click(getMenu());
  expect(getDrawer().className).not.toMatch(visibleClass);
  expect(onRender).toHaveBeenCalledTimes(initialRenderCount);
});
