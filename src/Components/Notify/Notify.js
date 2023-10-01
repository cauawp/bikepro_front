import React, { useEffect } from "react";
import "./Notify.css";

const Notify = (props) => {
  useEffect(() => {
    if (props.isVisible) {
      const timer = setTimeout(() => {
        props.onClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [props.isVisible, props.onClose]);

  return props.isVisible ? (
    <div className="notify">{props.notifyMsg}</div>
  ) : null;
};

export default Notify;
