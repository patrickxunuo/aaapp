import { LOAD_USER, SIGN_OUT } from "../../helpers";

const initState = null;

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_USER:
      return action.payload;
    case SIGN_OUT:
      return null;
    default:
      return state;
  }
};
