import { useState } from "react"
import { Link } from "react-router-dom"

export default function Login({ onLogin, clearAppErrors }) {
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({
        username: "",
        password: ""
    })

    function handleInput(e) {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
        clearAppErrors()
    }
    console.log(form)

    function handleSubmit(e) {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }).then((res) => {
            if (res.ok) {
                res.json().then((user) => onLogin(user))
            } else {
                res.json().then((err) => {
                    setErrors(err.errors)
                })
            }
        })
    }


    return (
      <div className="login">
        <form className="ui form login" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleInput}
            name="username"
            value={form.username}
            placeholder="username"
          />
          <input
            type="password"
            onChange={handleInput}
            name="password"
            value={form.password}
            placeholder="password"
          />
          <button className="ui basic orange button">Log-In</button>
          <br />
        </form>
        {errors.length > 0 ? errors.map((error) => <h3>{error}</h3>) : null}
        <div>
          <h4>
            Dont have an account? Sign-up <Link to="/signup">here</Link>!
          </h4>
        </div>
      </div>
    );
}