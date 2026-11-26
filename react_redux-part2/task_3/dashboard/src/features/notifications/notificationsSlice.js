import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const API_BASE_URL = "http://localhost:5173"
const ENDPOINTS ={
   notifications: `${API_BASE_URL}/notifications.json`
} 
    

export const initialState = {
    notifications : [],
    loading: false
}

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async ()=>{
    const res = await(axios.get(ENDPOINTS.notifications))
    const notifications = res.data

    if (!Array.isArray(notifications)) {
        throw new TypeError('Expected notifications response to be an array.');
    }

    return notifications
        .filter((notification) => notification.context.isRead === false)
        .map((notification) => ({
            id: notification.id,
            type: notification.context.type,
            isRead: notification.context.isRead,
            value: notification.context.value,
        }));
})

const notificationsSlice = createSlice({
        name:'notifications',
        initialState: initialState,
        reducers: {
            markNotificationAsRead : (state, action) => {
                const notificationId =
                  typeof action.payload === 'object'
                    ? action.payload.notifications?.[0]?.id
                    : action.payload
            
                state.notifications = state.notifications.filter(
                  (notification) => notification.id !== notificationId
                )
              },

        },
        extraReducers : (builder) => {
            builder.addCase(fetchNotifications.fulfilled, (state, action) =>{
                state.notifications = action.payload
                state.loading = false
            })
            builder.addCase(fetchNotifications.pending, (state)=>{
                state.loading = true;
            })
            builder.addCase(fetchNotifications.rejected, (state) =>{
                state.loading = false;
            })
        }
    }
)

export const {markNotificationAsRead, showDrawer, hideDrawer} = notificationsSlice.actions
export default notificationsSlice.reducer