import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getLatestNotification } from '../../utils/utils';

const initialState = {
  notifications: [],
  displayDrawer: true,
};

const API_BASE_URL = 'http://localhost:5173';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const response = await axios.get(
      `${API_BASE_URL}/notifications.json`
    );

    const notifications = [...response.data.notifications];

    const latestNotification = {
      id: 3,
      type: 'urgent',
      html: { __html: getLatestNotification() },
    };

    const index = notifications.findIndex(
      (notification) => notification.id === 3
    );

    if (index !== -1) {
      notifications[index] = latestNotification;
    } else {
      notifications.push(latestNotification);
    }

    return notifications;
  }
);

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,

  reducers: {
    markNotificationAsRead: (state, action) => {
      const id = action.payload;

      state.notifications = state.notifications.filter(
        (notification) => notification.id !== id
      );
    },

    showDrawer: (state) => {
      state.displayDrawer = true;
    },

    hideDrawer: (state) => {
      state.displayDrawer = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      fetchNotifications.fulfilled,
      (state, action) => {
        state.notifications = action.payload;
      }
    );
  },
});

export const {
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;