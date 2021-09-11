import { useState } from 'react'

import Header from './Header';
import Signup from './components/Signup';
import Login from './components/Login';

import './App.css';

function App() {
  const [user, setUser] = useState("")

  function onLogin(user) {
    setUser(user)
  }

  console.log(user)

  return (
    <div className="App">
      <Header />
      <Signup />
      <Login onLogin={onLogin}/>
    </div>
  );
}

export default App;
