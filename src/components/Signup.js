import { useState } from "react"


export default function Signup() {
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
        })
            .then((res) => {
                debugger
                if (res.ok) {
                console.log("CREATED USER")
                } else {
                    res.json().then((err) => setErrors(err.errors))
            }
        })
    }




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
      </div>
    );
}