import { memo } from "react";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  item: {
    "@media (max-width: 900px)": {
      width: "100%",
      borderBottom: "1px solid black",
      fontSize: "20px",
      padding: "10px 8px",
      listStyle: "none",
    },
  },
});

const NotificationItem = memo(function NotificationItem({
  type,
  value,
  markAsRead,
  id,
}) {
  return (
    <li
      className={css(styles.item)}
      data-notification-type={type}
      style={{ color: type === "urgent" ? "red" : "blue" }}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
});

export default NotificationItem;
