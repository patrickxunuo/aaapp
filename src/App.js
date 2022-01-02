import './App.css';
import {Routes, Route } from "react-router-dom";
import SignIn from "./pages/Signin";
import {useState} from "react";
import Home from "./pages/Home";
import firebase from './firebase'

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(true)
  firebase.auth().onAuthStateChanged(user=>{
    console.log(user)
    if(user){
     return setIsUserSignedIn(true)
    }
   return setIsUserSignedIn(false)
  })

  return (
      <div className="App">
        {isUserSignedIn ?
          <Routes>
            <Route exact path="/" element={<Home/>}/>
          </Routes> :
          <Routes>
            <Route exact path="/" element={<SignIn/>}/>
          </Routes>
        }
      </div>
  );
}

export default App;
