import { useState } from "react"


export default function Signup() {
    const [form, setForm] = useState({
        name: "",
        username: "",
        password: "",
        password_confirmation: ""
    })


    return (
      <div>
        <form>
          <input 
                    type="text"
                    name="name"
                    value={form.name}
                    placeholder="name"
          />
          <input 
                    type="text"
                    name="username"
                    value={form.username}
                    placeholder="username"
          />
          <input 
                    type="text"
                    name="password"
                    value={form.password}
                    placeholder="password"
          />
          <input 
                    type="text"
                    name="password_confirmation"
                    value={form.password_confirmation}
                    placeholder="password_confirmation"
                />
                <button>Sign-Up!</button>
        </form>
      </div>
    );
}