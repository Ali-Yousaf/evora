
import { NavLink, Link } from "react-router-dom";

function Navbar()
{
    return (
        <header className="navbar">
            <Link to="/events" className="brand">
                evora<span>.</span>
            </Link>

            <nav className="nav-links">
                <NavLink to="/events">Explore Events</NavLink>
                <NavLink to="/my-events">My Events</NavLink>
            </nav>

            <div className="nav-actions">
                <Link to="/login" className="login-link">Log In</Link>
                <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
        </header>
    );
}

export default Navbar;