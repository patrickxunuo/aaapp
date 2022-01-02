import React from 'react'
import firebase from '../../firebase'
import {Button} from 'antd'

const SignIn= () => {
  const signInWithFirebase = () => {
    let googleProvider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithPopup(googleProvider)
      .then(res=>{
      console.log(res,'res')
    }).catch(err=>{
      console.log(err,'err')
    })
  }

  return (
    <>
      <Button onClick={signInWithFirebase} type="primary">
        Sign in with Google
      </Button>
    </>
  )
}

export default SignIn
