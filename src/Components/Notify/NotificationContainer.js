import React, { useEffect } from "react";
import Notify from "./Notify";
import "./Notify.css";

const NotificationContainer = ({ notifications, onClose }) => {
  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <Notify
          key={index}
          notifyMsg={notification.notifyMsg}
          isVisible={notification.isVisible}
          onClose={() => onClose(index)}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
