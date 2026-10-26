import React from "react"

class NotificationItem extends React.PureComponent {
    render(){
        const { type, html, value, markAsRead } = this.props
        return(
            html ?
            <li onClick={markAsRead} dangerouslySetInnerHTML={html} data-notification-type={type} className={`${type === 'urgent' ? 'text-[var(--urgent-notification-item)]' : 'text-[var(--default-notification-item)]'} border border-[var(--main-color)] p-3 text-sm min-[912px]:border-0 min-[912px]:p-0 min-[912px]:text-base`}></li>
            :
            <li onClick={markAsRead} data-notification-type={type} className={`${type === 'urgent' ? 'text-[var(--urgent-notification-item)]' : 'text-[var(--default-notification-item)]'} border border-[var(--main-color)] p-3 text-sm min-[912px]:border-0 min-[912px]:p-0 min-[912px]:text-base`}>{value}</li>
        )
    }
}
NotificationItem.defaultProps = {
    type: 'default',
}
export default NotificationItem