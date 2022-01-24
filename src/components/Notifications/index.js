import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideNoti } from "../../redux/actions";
import { Drawer } from "antd";
import { queryNotifications, readNotifications } from "./service";
import { timestampToTime } from "../../helpers";
import {AnimatePresence, motion} from 'framer-motion'
import "./styles.css";

const Notification = (props) => {
  const { value, reload } = props;
  const { createdTime, from, message, read, type, id } = value;
  const handleRead = async () => {
    try {
      await readNotifications(id);
      reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.div className="notification-wrapper" layout>
      <div className="notification-header">
        <div className="notification-from">{from}</div>
        <div className="notification-date">
          {timestampToTime(createdTime.seconds)}
        </div>
      </div>
      <div className="notification-content">{message}</div>
      <AnimatePresence>
      {!read && (
        <motion.div
          exit={{
            opacity: 0,
            x: "100%",
          }}
          className="notification-footer"
        >
          <button className="confirm-btn btn" onClick={handleRead}>
            Confirm
          </button>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
};

const Notifications = () => {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const visible = useSelector((s) => s.notificationReducer);
  const userInfo = useSelector((s) => s.userReducer);

  const reload = () => {
    if (userInfo.uid) {
      queryNotifications(userInfo.uid).then((res) => {
        setNotifications(res);
      });
    }
  };

  useEffect(reload, [userInfo.uid]);

  return (
    <Drawer
      visible={visible}
      title="Notifications"
      onClose={() => hideNoti()(dispatch)}
      width="300"
    >
      {notifications.map((notification, index) => (
        <Notification value={notification} key={index} reload={reload} />
      ))}
    </Drawer>
  );
};

export default Notifications;
