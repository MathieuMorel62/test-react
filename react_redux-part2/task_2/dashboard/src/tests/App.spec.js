import {
  render,
  fireEvent,
  screen,
  waitFor,
  act
} from '@testing-library/react';

import App from '../App';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../app/rootReducer';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

const mockNotificationsResponse = {
  data: {
    notifications: [
      {
        id: 1,
        type: 'default',
        value: 'New course available'
      },
      {
        id: 2,
        type: 'urgent',
        value: 'New resume available'
      },
      {
        id: 3,
        type: 'urgent',
        html: { __html: '' }
      }
    ]
  }
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

beforeEach(() => {
  mockAxios.get.mockImplementation((url) => {
    if (url.endsWith('/notifications.json')) {
      return Promise.resolve(mockNotificationsResponse);
    }

    if (url.endsWith('/courses.json')) {
      return Promise.resolve(mockCoursesResponse);
    }

    return Promise.reject(
      new Error(`Unexpected URL: ${url}`)
    );
  });
});

async function renderApp() {
  const store = configureStore({
    reducer: rootReducer
  });

  let result;

  await act(async () => {
    result = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });

  await screen.findByText('New course available');

  await waitFor(() => {
    expect(
      store.getState().courses.courses
    ).toHaveLength(3);
  });

  return {
    store,
    ...result
  };
}

async function submitLogin() {
  fireEvent.change(
    screen.getByLabelText(/email/i),
    {
      target: { value: 'test@example.com' },
    }
  );

  fireEvent.change(
    screen.getByLabelText(/password/i),
    {
      target: { value: 'password123' },
    }
  );

  await act(async () => {
    fireEvent.click(
      screen.getByRole('button', { name: /ok/i })
    );
  });
}

const getDrawer = () =>
  screen.getByText(
    /here is the list of notifications/i
  ).parentElement;

const visibleClass = /(?:^|\s)visible_[^\s]+/;

test('The App component renders without crashing', async () => {
  await renderApp();

  expect(mockAxios.get).toHaveBeenCalled();
});

test('The App component renders Login by default (user not logged in)', async () => {
  await renderApp();

  expect(
    screen.getByLabelText(/email/i)
  ).toBeInTheDocument();

  expect(
    screen.getByLabelText(/password/i)
  ).toBeInTheDocument();

  expect(
    screen.getByRole('button', { name: /ok/i })
  ).toBeInTheDocument();
});

test('it should display school news by default', async () => {
  await renderApp();

  expect(
    screen.getByRole('heading', {
      name: /news from the school/i
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText(/holberton school news goes here/i)
  ).toBeInTheDocument();
});

test('clicking a notification removes it from the list and store', async () => {
  const { store } = await renderApp();

  fireEvent.click(
    screen.getByText(/your notifications/i)
  );

  fireEvent.click(
    screen.getByText('New course available')
  );

  expect(
    screen.queryByText('New course available')
  ).not.toBeInTheDocument();

  expect(
    store.getState().notifications.notifications
  ).toHaveLength(2);
});

test('clicking notification title adds the visible class', async () => {
  await renderApp();

  expect(
    getDrawer().className
  ).not.toMatch(visibleClass);

  fireEvent.click(
    screen.getByText(/your notifications/i)
  );

  expect(
    getDrawer().className
  ).toMatch(visibleClass);
});

test('clicking close removes the visible class without removing the drawer', async () => {
  await renderApp();

  fireEvent.click(
    screen.getByText(/your notifications/i)
  );

  fireEvent.click(
    screen.getByRole('button', { name: /close/i })
  );

  expect(
    getDrawer().className
  ).not.toMatch(visibleClass);

  expect(
    getDrawer()
  ).toBeInTheDocument();
});

test('login updates the user state', async () => {
  const { store } = await renderApp();

  await submitLogin();

  expect(
    await screen.findByRole('heading', {
      name: /course list/i
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByLabelText(/email/i)
  ).not.toBeInTheDocument();

  expect(
    screen.getByText('test@example.com')
  ).toBeInTheDocument();

  expect(store.getState().auth).toEqual({
    user: {
      email: 'test@example.com',
      password: 'password123'
    },
    isLoggedIn: true,
  });
});

test('logout resets the user state', async () => {
  const { store } = await renderApp();

  await submitLogin();

  expect(
    await screen.findByText('test@example.com')
  ).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(screen.getByText(/logout/i));
  });

  expect(
    await screen.findByRole('heading', {
      name: /log in to continue/i
    })
  ).toBeInTheDocument();

  expect(
    screen.queryByRole('heading', {
      name: /course list/i
    })
  ).not.toBeInTheDocument();

  expect(store.getState().auth).toEqual({
    user: {
      email: '',
      password: ''
    },
    isLoggedIn: false,
  });
});

test('notifications data is fetched when App loads', async () => {
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

test('courses data is fetched again when user logs in', async () => {
  await renderApp();

  const url = 'http://localhost:5173/courses.json';

  const initialCalls = mockAxios.get.mock.calls.filter(
    ([endpoint]) => endpoint === url
  ).length;

  await submitLogin();

  await waitFor(() => {
    expect(
      mockAxios.get.mock.calls.filter(
        ([endpoint]) => endpoint === url
      )
    ).toHaveLength(initialCalls + 1);
  });

  expect(
    await screen.findByText('ES6')
  ).toBeInTheDocument();

  expect(
    screen.getByText('Webpack')
  ).toBeInTheDocument();

  expect(
    screen.getByText('React')
  ).toBeInTheDocument();
});
