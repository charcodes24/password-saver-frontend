import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { trackPromise } from "react-promise-tracker";

import PasswordCard from "./PasswordCard";
import Search from "./Search";

export default function HomePage({ onLogout, user }) {
  const [errors, setErrors] = useState([])
  const { id, name } = user
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("all")
    const [passwords, setPasswords] = useState([])
    const [toggleForm, setToggleForm] = useState(false)
    const history = useHistory()
    const [form, setForm] = useState({
        key: "",
        charm: "",
        chain: ""
    })

  useEffect(() => {
    trackPromise(
        fetch(`/users/${id}/passwords`)
          .then((res) => res.json())
          .then((data) => setPasswords(data))
      )
    }, [id]);

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
  
   function handleSearchChange(e) {
     setSearch(e.target.value);
   }

   const searchPasswords = passwords.filter((password) =>
     password.key.toLowerCase().startsWith(search.toLowerCase())
   );
  
  function handleSortChange(e) {
    setSort(e.target.value)
  }

  const sortedPasswords = searchPasswords.sort((pass1, pass2) => {
    switch (sort) {
      case "all":
        return searchPasswords;
      case "aToZ":
        return pass1.key.toLowerCase() < pass2.key.toLowerCase() ? -1 : 1;
      case "zToA":
        return pass2.key.toLowerCase() < pass1.key.toLowerCase() ? -1 : 1;
    }
  })

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
        fetch("/passwords", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            key: form.key,
            charm: form.charm,
            chain: form.chain,
            user_id: id,
          }),
        })
          .then((res) => {
            if (res.ok) {
              console.log("RES", res);
              res.json().then((data) => {
                addNewPassword(data);
                setForm({
                  key: "",
                  charm: "",
                  chain: "",
                });
                setToggleForm(!toggleForm);
              });
            } else {
              console.log("RES", res);
              res.json().then((err) => setErrors(err.errors));
            }
          })
    }



    return (
      <div>
        <h1>Hi {name}! 🍄</h1>
        {toggleForm ? (
          <form className="ui form add" onSubmit={handleSubmit}>
            <div>
              <input
                onChange={handleInput}
                type="text"
                placeholder="What is this for?"
                name="key"
                value={form.key}
              />
              <input
                onChange={handleInput}
                type="text"
                placeholder="Username"
                name="charm"
                value={form.charm}
              />
              <input
                onChange={handleInput}
                type="text"
                placeholder="Password"
                name="chain"
                value={form.chain}
              />
            </div>
            <button className="add-password ui basic purple button">
              Add New Password
            </button>
          </form>
        ) : null}
        {errors.length > 0 ? errors.map((error) => <h3>{error}</h3>) : null}
        <button className="ui basic orange button" onClick={handleToggleForm}>
          Add Password
        </button>
        <button className="ui basic yellow button" onClick={userLogout}>
          Logout
        </button>
        <Search search={search} handleSearchChange={handleSearchChange} handleSortChange={handleSortChange}/>
        <div className="card-container">
          <div className="sub-container">
            {passwords.length > 0 ? (
              sortedPasswords?.map((password) => {
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
              <div className="flex-child">
                <h3 className="no-passwords">
                  You have no passwords saved yet.
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}