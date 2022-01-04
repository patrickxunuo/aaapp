import {SHOW_NOTI, HIDE_NOTI} from "../helpers";

const initState = false

export default (state = initState, action) => {
  switch (action.type) {
    case SHOW_NOTI:
      return true;
    case HIDE_NOTI:
      return false;
    default:
      return state;
  }
}
