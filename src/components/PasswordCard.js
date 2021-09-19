import { useState } from "react"

export default function Password({ password, reflectDeletedPassword, updatePasswords }) {
    const [errors, setErrors] = useState([])
    const { id, key, charm, chain } = password
    const [toggleForm, setToggleForm] = useState(false)
    const [form, setForm] = useState({
        key: "",
        charm: "",
        chain: ""
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

    function handleSubmit(e) {
        e.preventDefault()
        fetch(`/passwords/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key: form.key || {key},
                charm: form.charm || {charm},
                chain: form.chain || {chain}
            })
        })
            .then(res => {
                if (res.ok) {
                    console.log("RES", res)
                    res.json().then((data) => {
                        updatePasswords(data)
                        setForm({
                            key: "",
                            charm: "",
                            chain: ""   
                        })
                        setToggleForm(!toggleForm)
                    })
                } else {
                    res.json().then((err) =>
                        setErrors(err))
            }
        })
    }

    function deletePassword(e) {
        e.preventDefault()
        fetch(`passwords/${id}`, {
            method: "DELETE"
        })
        reflectDeletedPassword(id)
    }
    

    return (
      <div>
        <div className="charm">
          <h3 className="key">Key:</h3>
          <p>{key}</p>
          <h3 className="charm">Charm:</h3>
          <p>{charm}</p>
          <h3 className="chain">Chain:</h3>
          <p>{chain}</p>
          {!toggleForm ? (
            <button
              className="ui basic purple button"
              onClick={handleToggleForm}
            >
              Update
            </button>
          ) : null}
          {toggleForm ? (
            <div className="content">
              <form className="ui form update" onSubmit={handleSubmit}>
                <input
                  onChange={handleInput}
                  type="text"
                  name="key"
                  value={form.key}
                  placeholder={key}
                />
                <input
                  onChange={handleInput}
                  type="text"
                  name="charm"
                  value={form.charm}
                  placeholder={charm}
                />
                <input
                  onChange={handleInput}
                  type="text"
                  name="chain"
                  value={form.chain}
                  placeholder={chain}
                />
                <button className="ui basic blue button">
                  Update Password
                </button>
                <button
                  className="ui basic small pink button"
                  onClick={deletePassword}
                >
                  Delete Password
                </button>
              </form>
            </div>
          ) : null}
          {errors.length > 0 ? errors.map((error) => <h3 className="ui violet message">{error}</h3>) : null}
        </div>
      </div>
    );
}