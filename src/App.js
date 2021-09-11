import { Switch, Route, Redirect } from 'react-router'
import { useState, useEffect } from 'react'

import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './HomePage';

import './App.css';

function App() {
  const [user, setUser] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)

  function keepUserLoggedIn(user) {
    setUser(user);
    setLoggedIn(true);
  }

  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          keepUserLoggedIn(user)
        })
      }
    })
  }, []);

  

  function onLogin(user) {
    setUser(user)
    setLoggedIn(true)
  }

  function onLogout() {
    setUser("")
    setLoggedIn(false)
  }

  console.log("USER IN APP", user.id)
  console.log("IS USER LOGGED IN?", loggedIn)

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/home" /> : <Login onLogin={onLogin} />}
        </Route>
        <Route path="/signup">
          {loggedIn ? <Redirect to="/home" /> : <Signup />}
        </Route>
        <Route path="/home">
          <HomePage user={user} onLogout={onLogout}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
