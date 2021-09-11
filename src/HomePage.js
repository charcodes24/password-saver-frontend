import { useEffect, useState } from "react";
import { useHistory } from "react-router";

export default function HomePage({ onLogout, user }) {
    const { id } = user
    const [passwords, setPasswords] = useState([])
    const history = useHistory()

    console.log("USER ID", id)

    useEffect(() => {
        fetch(`/users/${id}/passwords`)
          .then((res) => res.json())
          .then((data) => setPasswords(data));
    }, [id]);

    console.log(passwords)

    function userLogout(e) {
        e.preventDefault()
        fetch("/logout", {
            method: "DELETE"
        })
        onLogout()
        history.push("/")
    }


    return (
      <div>
            <h1>Home Page</h1>
            <button onClick={userLogout}>Logout</button>
      </div>
    );
}