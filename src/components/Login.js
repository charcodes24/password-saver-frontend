import { useState } from "react"

export default function Login({ onLogin }) {
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
        })
        .then((res) => res.json())
        .then((user) => onLogin(user))
    }


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
            </form>
        </div>
    )
}