import { useState } from "react"

export default function Password({ password, reflectDeletedPassword, updatePasswords }) {
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
            body: JSON.stringify(form)
        })
            .then(res => {
                if (res.ok) {
                    res.json().then((data) => updatePasswords(data))
                } else {
                    res.json().then((err) => 
                    console.log((err)))
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
            <p>Key: {key}</p>
            <p>Charm: {charm}</p>
            <p>Chain: {chain}</p>
            {!toggleForm ? <button onClick={handleToggleForm}>Update</button> : null}
            {toggleForm ? (
                <form onSubmit={handleSubmit}>
                    <input onChange={handleInput} type="text" name="key" value={form.key} placeholder={key} />
                    <input onChange={handleInput} type="text" name="chain" value={form.chain} placeholder={chain} />
                    <button>Update Password</button>
                    <button onClick={deletePassword}>Delete Password</button>
                </form>
            ) : null}
        </div>
    )
}