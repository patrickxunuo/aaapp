import React from 'react';
import firebase from '../../firebase'
import {signOut as userSignOut} from "../../actions";
import {useSelector, useDispatch} from 'react-redux'
import {Avatar} from "antd";


const Home = () => {
  const dispatch = useDispatch()

  const signOut = () => {
    firebase.auth().signOut()
    userSignOut()(dispatch)
  }

  return(
      <>
        <button onClick={signOut} className="signout-btn btn">
          Sign Out
        </button>
      </>
  )
}

export default Home
