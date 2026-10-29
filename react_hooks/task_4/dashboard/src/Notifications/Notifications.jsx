import NotificationItem from "./NotificationItem"
import { memo } from "react"

const Notifications = memo(function Notifications (props){
  const {
        displayDrawer = false,
        notifications = [],
        handleDisplayDrawer,
        handleHideDrawer,
      markNotificationAsRead,
    } = props
    return (
        <div className="fixed inset-0 z-50 h-screen w-full overflow-y-auto bg-white p-3 min-[912px]:inset-auto min-[912px]:top-0 min-[912px]:right-0 min-[912px]:h-auto min-[912px]:w-1/4 min-[912px]:overflow-visible min-[912px]:p-0">
          <div className={`notification-title text-right text-sm min-[912px]:text-base ${notifications.length > 0 && !displayDrawer ? 'animate-bounce' : ''}`}>
            <p onClick={handleDisplayDrawer}>Your notifications</p>
          </div>
          {displayDrawer === true &&
          
          <div className="notification-items border border-dashed border-[var(--main-color)] p-3 min-[912px]:p-[6px]">
            {notifications.length > 0 ?
              <>
                <button
                  aria-label='Close'
                  style={{ float: 'right' }}
                  onClick={handleHideDrawer}
                >
                  Close
                </button>
                <p>Here is the list of notifications</p>
              <ul className="list-inside list-disc space-y-2 p-0 min-[912px]:space-y-0">
                {notifications.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      id={notification.id}
                      type={notification.type}
                      html={notification.html}
                      value={notification.value}
                      markAsRead={markNotificationAsRead}
                    />
                  ))}
              </ul>
              </>
            :
            <p>No new notification for now</p>
            }
            </div>
          }
        </div>
      )
})


export default Notifications;