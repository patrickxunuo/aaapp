import {LOAD_USER, SIGN_OUT} from "../../helpers";
import firebase from '../../firebase'
import {message} from 'antd'

export const loadUser = userInfo => dispatch => {
  const db = firebase.firestore()
  db.collection('users').doc(userInfo.uid).set({
    uid: userInfo.uid,
    displayName: userInfo.displayName,
    email: userInfo.email,
  })
  message.success(`Hi, ${userInfo.displayName}. Welcome back!`)
  dispatch({
    type: LOAD_USER,
    payload: userInfo,
  })
}

export const signOut = () => dispatch => {
  dispatch({
    type: SIGN_OUT,
  })
}
