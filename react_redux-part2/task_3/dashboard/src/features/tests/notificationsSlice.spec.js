import notificationsSlice, {
  initialState,
  markNotificationAsRead,
  fetchNotifications,
} from '../notifications/notificationsSlice';


import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  test('should return the initial state', () => {
    expect(notificationsSlice(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('should handle markNotificationAsRead', () => {
    const stateWithNotifications = {
      ...initialState,
      notifications: [
        { id: 1, type: 'urgent', isRead: false, value: 'Notification 1' },
        { id: 2, type: 'default', isRead: false, value: 'Notification 2' },
      ],
    };
    const action = markNotificationAsRead(1);
    const expectedState = {
      ...stateWithNotifications,
      notifications: [
        { id: 2, type: 'default', isRead: false, value: 'Notification 2' },
      ],
    };
    expect(notificationsSlice(stateWithNotifications, action)).toEqual(
      expectedState
    );
  });

  describe('fetchNotifications async thunk', () => {
    test('should handle fetchNotifications.pending', () => {
      const action = { type: fetchNotifications.pending.type };
      const state = notificationsSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: true,
      });
    });

    test('should handle fetchNotifications.rejected', () => {
      const action = {
        type: fetchNotifications.rejected.type,
      };
      const state = notificationsSlice(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
      });
    });

    test('should handle fetchNotifications.fulfilled when API request is successful', async () => {
      const notifications = [
        {
          id: 'unread-default',
          context: {
            type: 'default',
            isRead: false,
            value: 'New course available',
          },
        },
        {
          id: 'read-urgent',
          context: {
            type: 'urgent',
            isRead: true,
            value: 'Read notification',
          },
        },
        {
          id: 'unread-urgent',
          context: {
            type: 'urgent',
            isRead: false,
            value: 'New resume available',
          },
        },
      ];

      const dispatch = jest.fn();
      const getState = jest.fn();

      const promise = fetchNotifications()(dispatch, getState, null);

      mockAxios.mockResponse({
        data: notifications
      });

      await promise;

      expect(dispatch).toHaveBeenCalledTimes(2);

      const fulfilledAction = dispatch.mock.calls[1][0];

      expect(fulfilledAction.type).toBe(fetchNotifications.fulfilled.type);
      expect(fulfilledAction.payload).toEqual([
        {
          id: 'unread-default',
          type: 'default',
          isRead: false,
          value: 'New course available',
        },
        {
          id: 'unread-urgent',
          type: 'urgent',
          isRead: false,
          value: 'New resume available',
        },
      ]);
    });

    test('should update state.notifications when fetchNotifications succeeds', () => {
      const mockNotifications = [
        { id: 1, type: 'default', isRead: false, value: 'notification 1' },
        { id: 2, type: 'urgent', isRead: false, value: 'notification 2' },
      ];

      const action = {
        type: fetchNotifications.fulfilled.type,
        payload: mockNotifications
      };

      const newState = notificationsSlice(initialState, action);

      expect(newState.notifications).toEqual(mockNotifications);
      expect(newState.notifications).toHaveLength(2);
      expect(newState.notifications).not.toEqual([]);
      expect(newState.loading).toBe(false);
    });
  });
});