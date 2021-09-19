import { useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router"


export default function Signup({ onLogin }) {
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
        password_confirmation: ""
    })

    function handleInput(e) {
      e.preventDefault();
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(form)
        }).then((res) => {
                if (res.ok) {
                res.json().then((data) => onLogin(data))
                history.push("/home")
                } else {
                res.json().then((err) => setErrors(err.errors))
            }
        })
    }


    return (
      <div>
        <h3>Sign-Up</h3>
        <form className="ui form signup" onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={handleInput}
            name="name"
            value={form.name}
            placeholder="name"
          />
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
          <input
            type="password"
            onChange={handleInput}
            name="password_confirmation"
            value={form.password_confirmation}
            placeholder="password_confirmation"
          />
          <button className="ui basic green button">Sign-Up!</button>
        </form>
        {(errors.length > 0) ? errors.map((error) => <h3 className="ui violet message">{error}</h3>) : null}

        <div>
          <h4>Already have an account? Login <Link to="/">here!</Link></h4>
        </div>
      </div>
    );
}