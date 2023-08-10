import { LOAD_USER, SIGN_OUT } from "../../helpers";
import firebase from "../../firebase";

export const loadUser = (userInfo) => (dispatch) => {
  const db = firebase.firestore();
  db.collection("users").doc(userInfo.uid).set({
    uid: userInfo.uid,
    displayName: userInfo.displayName,
    email: userInfo.email,
  });
  dispatch({
    type: LOAD_USER,
    payload: userInfo,
  });
};

export const signOut = () => (dispatch) => {
  dispatch({
    type: SIGN_OUT,
  });
};
