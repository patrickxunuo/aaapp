import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import firebase from "./firebase";
import { loadUser, signOut } from "./redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./components/Footer";
import Groups from "./components/Groups";
import ProfileBadge from "./components/ProfileBadge";
import Notifications from "./components/Notifications";
import { message } from "antd";

const db = firebase.firestore();

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.userReducer);

  const [isUserSignedIn, setIsUserSignedIn] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        loadUser(user["_delegate"])(dispatch);
      } else {
        signOut()(dispatch);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      message.success(`Hi, ${user.displayName}. Welcome back!`);
    }
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <div className="page-container">
          <Notifications />
          <ProfileBadge />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/groups/:id" element={<Groups />} />
          </Routes>
          <Footer />
        </div>
      ) : (
        <Routes>
          <Route exact path="/" element={<SignIn />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
