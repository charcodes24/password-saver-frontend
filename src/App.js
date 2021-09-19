import { Switch, Route, Redirect } from 'react-router'
import { useState, useEffect } from 'react'

import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';

function App() {
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState([])
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
          clearAppErrors()
          setLoading(false)
        })
      } else {
        response.json().then((err) => setErrors(err.errors))
        setLoading(false)
      }
    })
  }, []);

  function clearAppErrors() {
    setErrors([])
  }

  function onLogin(user) {
    setUser(user)
    setLoggedIn(true)
  }

  function onLogout() {
    setUser("")
    setLoggedIn(false)
  }

  console.log(loading)

  if (loading) {
    return null
  }


  return (
    <div className="App">
      {!loggedIn ? <About /> : null}
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/home" /> : <Login onLogin={onLogin} clearAppErrors={clearAppErrors}/>}
        </Route>
        <Route path="/signup">
          <Signup onLogin={onLogin} />
        </Route>
        <Route path="/home">
          <HomePage user={user} onLogout={onLogout} />
        </Route>
      </Switch>
      {/* {(errors.length > 0) ? errors.map((error) => <h3>APP: {error}</h3>) : null} */}
    </div>
  );
}

export default App;
