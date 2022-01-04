import {SHOW_NOTI, HIDE_NOTI} from "../helpers";

export const showNoti = () => dispatch => {
  dispatch({
    type: SHOW_NOTI,
  })
}

export const hideNoti = () => dispatch => {
  dispatch({
    type: HIDE_NOTI,
  })
}
