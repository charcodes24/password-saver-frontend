import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import PasswordCard from "./PasswordCard";

export default function HomePage({ onLogout, user }) {
    const { id, name } = user
    const [passwords, setPasswords] = useState([])
    const [toggleForm, setToggleForm] = useState(false)
    const history = useHistory()
    const [form, setForm] = useState({
        key: "",
        charm: "",
        chain: ""
    })

    console.log("USER ID", id)

    useEffect(() => {
        fetch(`/users/${id}/passwords`)
          .then((res) => res.json())
          .then((data) => setPasswords(data));
    }, [id]);

    console.log(passwords)

    function userLogout(e) {
        e.preventDefault()
        fetch("/logout", {
            method: "DELETE"
        })
        onLogout()
        history.push("/")
    }

    function reflectDeletedPassword(id) {
        const updatedPasswords = passwords.filter(password => password.id !== id)
        setPasswords(updatedPasswords)
    }

    function handleToggleForm(e) {
        e.preventDefault()
        setToggleForm(!toggleForm)
    }

    function handleInput(e) {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    console.log(form)

    function addNewPassword(newPassword) {
        setPasswords((mostUpdatedPasswords) => [...mostUpdatedPasswords, newPassword])
    }

    function updatePasswords(updatedPassword) {
        setPasswords((mostUpdatedPasswords) => {
            return mostUpdatedPasswords.map((password) => {
                if (updatedPassword.id === password.id) {
                    return updatedPassword
                } else {
                    return password
                }
            })
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/passwords', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                key: form.key,
                charm: form.charm,
                chain: form.chain,
                user_id: id
            })
        })
        .then(res => res.json())
        .then(data => addNewPassword(data))
        setForm({
            key: "",
            charm: "",
            chain:""
        })
    }


    return (
      <div>
        <h1>Hi {name}!</h1>
        {toggleForm ? (
          <form onSubmit={handleSubmit}>
            <input
              onChange={handleInput}
              type="text"
              placeholder="Password for..."
              name="key"
              value={form.key}
            />
            <input
              onChange={handleInput}
              type="text"
              placeholder="charm"
              name="charm"
              value={form.charm}
            />
            <input
              onChange={handleInput}
              type="text"
              placeholder="password"
              name="chain"
              value={form.chain}
            />
            <button>Add New Password</button>
          </form>
        ) : null}
        <button onClick={handleToggleForm}>Add Password</button>
        <button onClick={userLogout}>Logout</button>
        {passwords.length > 0 ? (
          passwords?.map((password) => {
            return (
              <PasswordCard
                key={password.id}
                password={password}
                user={user}
                reflectDeletedPassword={reflectDeletedPassword}
                updatePasswords={updatePasswords}
              />
            );
          })
        ) : (
          <h3>You have no passwords saved yet.</h3>
        )}
      </div>
    );
}