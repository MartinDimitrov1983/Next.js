import { useContext } from "react";

import classes from "./Notification.module.css";
import NotificationContext from "../../store/Notification";

function Notification({ title, message, status, ...props }) {
  const notificationCtx = useContext(NotificationContext);

  let statusClasses = "";

  console.log(status);

  if (status === "success") {
    statusClasses = classes.success;
  }

  if (status === "error") {
    console.log("from error");
    statusClasses = classes.error;
  }

  if (status === "pending") {
    console.log("from pending");
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  console.log(activeClasses);
  return (
    <div className={activeClasses} onClick={notificationCtx.hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
