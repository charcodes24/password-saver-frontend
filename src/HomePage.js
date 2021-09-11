export default function HomePage({ onLogout }) {

    function userLogout(e) {
        e.preventDefault()
        fetch("/logout", {
            method: "DELETE"
        })
        onLogout()
    }

    
    return (
      <div>
            <h1>Home Page</h1>
            <button onClick={userLogout}>Logout</button>
      </div>
    );
}