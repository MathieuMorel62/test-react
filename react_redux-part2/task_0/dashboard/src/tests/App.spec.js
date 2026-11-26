
import { render, fireEvent, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../app/rootReducer';
import App from '../App';
import mockAxios from 'jest-mock-axios';

const mockNotificationsResponse = {
  data: {
    notifications: [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '' } },
    ],
  },
};

const mockCoursesResponse = {
  data: {
    courses: [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ],
  },
};

beforeEach(() => {
  mockAxios.get.mockImplementation((url) => {
    if (url === 'http://localhost:5173/notifications.json') {
      return Promise.resolve(mockNotificationsResponse);
    }

    if (url === 'http://localhost:5173/courses.json') {
      return Promise.resolve(mockCoursesResponse);
    }

    return Promise.reject(new Error(`Unexpected URL: ${url}`));
  });
});

afterEach(() => {
  mockAxios.reset();
});

async function renderApp() {
  const store = configureStore({
    reducer: rootReducer,
  });

  let result;

  await act(async () => {
    result = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  return {
    store,
    ...result,
  };
}

async function loginUser() {
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  fireEvent.change(emailInput, {
    target: { value: 'test@example.com' },
  });

  fireEvent.change(passwordInput, {
    target: { value: 'password123' },
  });

  const submitButton = screen.getByRole('button', {
    name: /ok/i,
  });

  await act(async () => {
    fireEvent.click(submitButton);
  });
}

test('The App component renders without crashing', async () => {
  await renderApp();

  expect(
    screen.getByRole('heading', { name: /school dashboard/i })
  ).toBeInTheDocument();

  expect(mockAxios.get).toHaveBeenCalled();
});

test('The App component renders Login by default (user not logged in)', async () => {
  await renderApp();

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: /ok/i })
  ).toBeInTheDocument();
});

test('it should display "News from the School" title and paragraph by default', async () => {
  await renderApp();

  const newsTitle = screen.getByRole('heading', {
    name: /news from the school/i,
  });

  const newsParagraph = screen.getByText(
    /holberton school news goes here/i
  );

  expect(newsTitle).toBeInTheDocument();
  expect(newsParagraph).toBeInTheDocument();
});

test('clicking on a notification item removes it from the list', async () => {
  const { container, store } = await renderApp();

  fireEvent.click(screen.getByText(/your notifications/i));

  const notificationItems = container.querySelectorAll(
    '[data-notification-type]'
  );

  const initialCount = notificationItems.length;

  expect(initialCount).toBe(3);

  fireEvent.click(notificationItems[0]);

  const updatedNotificationItems = container.querySelectorAll(
    '[data-notification-type]'
  );

  expect(updatedNotificationItems.length).toBe(initialCount - 1);

  expect(store.getState().notifications.notifications).toHaveLength(2);

  expect(
    store.getState().notifications.notifications.some(
      (notification) => notification.id === 1
    )
  ).toBe(false);
});

test('clicking the notification title adds the visible CSS class', async () => {
  await renderApp();

  const drawer = screen.getByText(
    /here is the list of notifications/i
  ).parentElement;

  const notificationTitle = screen.getByText(
    /your notifications/i
  );

  expect(drawer.className).not.toMatch(/\bvisible_/);

  fireEvent.click(notificationTitle);

  expect(drawer.className).toMatch(/\bvisible_/);

  expect(
    screen.getByText(/here is the list of notifications/i)
  ).toBeInTheDocument();
});

test('clicking the close button removes the visible CSS class', async () => {
  await renderApp();

  const drawer = screen.getByText(
    /here is the list of notifications/i
  ).parentElement;

  fireEvent.click(screen.getByText(/your notifications/i));

  expect(drawer.className).toMatch(/\bvisible_/);

  const closeButton = screen.getByRole('button', {
    name: /close/i,
  });

  fireEvent.click(closeButton);

  expect(drawer.className).not.toMatch(/\bvisible_/);

  expect(
    screen.getByText(/here is the list of notifications/i)
  ).toBeInTheDocument();

  expect(
    screen.getByText(/your notifications/i)
  ).toBeInTheDocument();
});

test('login updates user state with email, password, and isLoggedIn true', async () => {
  const { store } = await renderApp();

  expect(
    screen.getByRole('heading', {
      name: /log in to continue/i,
    })
  ).toBeInTheDocument();

  await loginUser();

  expect(store.getState().auth).toEqual({
    user: {
      email: 'test@example.com',
      password: 'password123',
    },
    isLoggedIn: true,
  });

  expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();

  expect(
    screen.getByRole('heading', { name: /course list/i })
  ).toBeInTheDocument();

  expect(
    screen.getByText('test@example.com')
  ).toBeInTheDocument();
});

test('logout resets user state to isLoggedIn false with empty email and password', async () => {
  const { store } = await renderApp();

  await loginUser();

  expect(
    screen.getByText('test@example.com')
  ).toBeInTheDocument();

  const logoutLink = screen.getByText(/logout/i);

  await act(async () => {
    fireEvent.click(logoutLink);
  });

  expect(store.getState().auth).toEqual({
    user: {
      email: '',
      password: '',
    },
    isLoggedIn: false,
  });

  expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();

  expect(
    screen.queryByRole('heading', { name: /course list/i })
  ).not.toBeInTheDocument();

  expect(
    screen.getByRole('heading', {
      name: /log in to continue/i,
    })
  ).toBeInTheDocument();

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test('verify notifications data is fetched when App component loads initially', async () => {
  await renderApp();

  expect(mockAxios.get).toHaveBeenCalledWith(
    'http://localhost:5173/notifications.json'
  );

  expect(
    screen.getByText('New course available')
  ).toBeInTheDocument();

  expect(
    screen.getByText('New resume available')
  ).toBeInTheDocument();
});

test('verify courses data is fetched when user state changes to logged in', async () => {
  await renderApp();

  const coursesUrl = 'http://localhost:5173/courses.json';

  const initialCalls = mockAxios.get.mock.calls.filter(
    ([url]) => url === coursesUrl
  ).length;

  await loginUser();

  const updatedCalls = mockAxios.get.mock.calls.filter(
    ([url]) => url === coursesUrl
  ).length;

  expect(updatedCalls).toBeGreaterThan(initialCalls);

  expect(screen.getByText('ES6')).toBeInTheDocument();
  expect(screen.getByText('Webpack')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
});
