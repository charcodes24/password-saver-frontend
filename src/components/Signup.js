import { useState } from "react"
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

    console.log(errors)

    function handleInput(e) {
      e.preventDefault();
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    }
    console.log(form);

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

    console.log(errors)




    return (
      <div>
        <h3>Sign-Up</h3>
        <form onSubmit={handleSubmit}>
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
            type="text"
            onChange={handleInput}
            name="password"
            value={form.password}
            placeholder="password"
          />
          <input
            type="text"
            onChange={handleInput}
            name="password_confirmation"
            value={form.password_confirmation}
            placeholder="password_confirmation"
          />
          <button>Sign-Up!</button>
        </form>
        {errors.length > 0 ? errors.map((error) => <h3>{error}</h3>) : null}
      </div>
    );
}