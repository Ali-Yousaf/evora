import { NavLink, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

function Navbar()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isAuthenticated } = useSelector((state) => state.auth);

    function handleLogout()
    {
        dispatch(logout());
        navigate("/login");
    }

    return (
        <header className="navbar">
            <Link to="/events" className="brand">
                evora<span>.</span>
            </Link>

            <nav className="nav-links">
                <NavLink to="/events">Explore Events</NavLink>

                {isAuthenticated && (
                    <NavLink to="/my-events">My Events</NavLink>
                )}
            </nav>

            <div className="nav-actions">
                {isAuthenticated ? (
                    <>
                        <span className="user-name">Hi, {user.name}</span>

                        <button className="btn btn-logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="login-link">Log In</Link>

                        <Link to="/register" className="btn btn-primary">
                            Get Started
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Navbar;