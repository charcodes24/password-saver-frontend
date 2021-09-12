import { NavLink } from "react-router-dom";

export default function NavBar() {


    return (
        <div>
            <NavLink to="/signup">Sign-Up</NavLink>
            <NavLink to="/">Log-In</NavLink>
        </div>
    )
}