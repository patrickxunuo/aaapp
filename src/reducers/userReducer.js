import {LOAD_USER, SIGN_OUT} from "../helpers";

const initState = {}

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return action.payload;
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
}
