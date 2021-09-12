import { useState } from "react"

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

    console.log("ERRORS", errors)


    return (
        <div>
            <h3>LogIn</h3>
            <form onSubmit={handleSubmit}>
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
                <button>Log-In</button>
                {(errors.length > 0) ? errors.map((error) => <h3>{error}</h3>) : null}
            </form>
        </div>
    )
}