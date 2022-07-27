import { Fragment, useContext } from "react";

import MainHeader from "./MainHeader";
import Notification from "../ui/Notification";
import NotificationContext from "../../store/Notification";

function Layout({ children, ...props }) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{children}</main>
      {activeNotification && <Notification {...activeNotification} />}
    </Fragment>
  );
}

export default Layout;
