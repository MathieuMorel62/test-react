import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import App from '../App';
import rootReducer from '../app/rootReducer';
import mockAxios from 'jest-mock-axios';

const NOTIFICATIONS_URL = 'http://localhost:5173/notifications.json';
const COURSES_URL = 'http://localhost:5173/courses.json';

afterEach(() => {
  mockAxios.reset();
});

const mockNotificationsResponse = {
  data: [
    {
      id: 1,
      context: {
        isRead: false,
        type: 'default',
        value: 'New course available',
      },
    },
    {
      id: 2,
      context: {
        isRead: false,
        type: 'urgent',
        value: 'New resume available',
      },
    },
    {
      id: 3,
      context: {
        isRead: false,
        type: 'urgent',
        value: 'Urgent requirement',
      },
    },
  ],
};

const mockCoursesResponse = {
  data: {
    courses: [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 }
    ]
  }
};

const renderApp = () => {
  const store = configureStore({ reducer: rootReducer });
  const result = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  mockAxios.mockResponseFor({ url: NOTIFICATIONS_URL }, mockNotificationsResponse);
  mockAxios.mockResponseFor({ url: COURSES_URL }, mockCoursesResponse);

  return { store, ...result };
};

test('The App component renders without crashing', async () => {
  renderApp();

  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenCalled();
  });
});

test('The App component renders Login by default (user not logged in)', async () => {
  renderApp();

  await waitFor(() => {
    const emailLabelElement = screen.getByLabelText(/email/i);
    const passwordLabelElement = screen.getByLabelText(/password/i);
    const buttonElements = screen.getAllByRole('button', { name: /ok/i })

    expect(emailLabelElement).toBeInTheDocument()
    expect(passwordLabelElement).toBeInTheDocument()
    expect(buttonElements.length).toBeGreaterThanOrEqual(1)
  });
});

test('it should display "News from the School" title and paragraph by default', async () => {
  renderApp();

  await waitFor(() => {
    const newsTitle = screen.getByRole('heading', { name: /news from the school/i });
    const newsParagraph = screen.getByText(/holberton school news goes here/i);

    expect(newsTitle).toBeInTheDocument();
    expect(newsParagraph).toBeInTheDocument();
  });
});

test('clicking on a notification item removes it from the list', async () => {
  const { container } = renderApp();

  await waitFor(() => {
    const notificationItems = container.querySelectorAll('[data-notification-type]');
    expect(notificationItems.length).toBeGreaterThan(0);
  });

  const notificationItems = container.querySelectorAll('[data-notification-type]');
  const initialCount = notificationItems.length;

  if (notificationItems.length > 0) {
    fireEvent.click(notificationItems[0]);

    const updatedNotificationItems = container.querySelectorAll('[data-notification-type]');
    expect(updatedNotificationItems.length).toBe(initialCount - 1);
  }
});

test('handleDisplayDrawer sets displayDrawer to true', async () => {
  const { container } = renderApp();

  await waitFor(() => {
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  const drawer = container.querySelector('[class*="notificationItems"]');
  const initialClassName = drawer.className;
  const closeButton = screen.getByRole('button', { name: /close/i });
  fireEvent.click(closeButton);

  expect(drawer.className).not.toBe(initialClassName);

  const notificationTitle = screen.getByText(/your notifications/i);
  fireEvent.click(notificationTitle);

  expect(drawer.className).toBe(initialClassName);
});

test('handleHideDrawer sets displayDrawer to false', async () => {
  const { container } = renderApp();

  await waitFor(() => {
    expect(screen.getByText(/here is the list of notifications/i)).toBeInTheDocument();
  });

  const drawer = container.querySelector('[class*="notificationItems"]');
  const initialClassName = drawer.className;
  const closeButton = screen.getByRole('button', { name: /close/i });
  fireEvent.click(closeButton);

  expect(drawer.className).not.toBe(initialClassName);
  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test('logIn function updates user state with email, password, and isLoggedIn true', async () => {
  renderApp();

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });

  const submitButton = screen.getByRole('button', { name: /ok/i });
  fireEvent.click(submitButton);

  mockAxios.mockResponseFor({ url: COURSES_URL }, mockCoursesResponse);

  await waitFor(() => {
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });
});

test('logOut function resets user state to isLoggedIn false with empty email and password', async () => {
  renderApp();

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  mockAxios.mockResponseFor({ url: COURSES_URL }, mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /course list/i })).toBeInTheDocument();
  });

  const logoutLink = screen.getByText(/logout/i);
  fireEvent.click(logoutLink);

  expect(screen.queryByText(/welcome/i)).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /course list/i })).not.toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /log in to continue/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
});

test('verify notifications data is fetched when App component loads initially', async () => {
  renderApp();

  expect(mockAxios.get).toHaveBeenCalledWith(NOTIFICATIONS_URL);

  await waitFor(() => {
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });
});

test('verify courses data is fetched when user state changes to logged in', async () => {
  renderApp();

  await waitFor(() => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(mockAxios.get).toHaveBeenCalledWith(COURSES_URL);
  });

  mockAxios.mockResponseFor({ url: COURSES_URL }, mockCoursesResponse);

  await waitFor(() => {
    expect(screen.getByText('ES6')).toBeInTheDocument();
    expect(screen.getByText('Webpack')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });
});
