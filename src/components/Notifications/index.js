import React from 'react';
import Modal from "antd/es/modal/Modal";
import {useSelector, useDispatch} from "react-redux";
import {hideNoti} from "../../actions";

const Notifications = () => {
  const dispatch = useDispatch()
  const visible = useSelector(s=>s.notificationReducer)
  const userInfo = useSelector(s=>s.userReducer)

  return(
    <Modal
    visible={visible}
    title="Notifications"
    onCancel={()=>hideNoti()(dispatch)}
    >

    </Modal>
  )
}

export default Notifications
