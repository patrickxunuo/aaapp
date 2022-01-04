import React from "react";
import firebase from "../../firebase";
import './styles.css'

const SignIn = () => {
  const signInWithFirebase = () => {
    let googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res, "res");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  return (
    <div className="page-container">
      <div className="signin-container">
        <div className="signin-title">AAAPP</div>
        <button
          className="signin-btn btn"
          onClick={signInWithFirebase}
          type="primary"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
