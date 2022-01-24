import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin";
import React, { useState } from "react";
import Home from "./pages/Home";
import firebase from "./firebase";
import { loadUser } from "./redux/actions";
import {useDispatch} from "react-redux";
import Footer from "./components/Footer";
import Groups from "./components/Groups";
import ProfileBadge from "./components/ProfileBadge";
import Notifications from "./components/Notifications";

const db = firebase.firestore()

const App = () => {
  const dispatch = useDispatch()

  const [isUserSignedIn, setIsUserSignedIn] = useState(true);
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      loadUser(user["_delegate"])(dispatch);
      return setIsUserSignedIn(true);
    }
    return setIsUserSignedIn(false);
  });

  return (
    <div className="App">
      {isUserSignedIn ? (
        <div className="page-container">
          <Notifications />
          <ProfileBadge />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path='/groups/:id' element={<Groups/>} />
          </Routes>
          <Footer/>
        </div>
      ) : (
        <Routes>
          <Route exact path="/" element={<SignIn />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
