import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";

function Login()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleLogin(e)
    {
        e.preventDefault();
        setError("");

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const foundUser = users.find((user) =>
            user.email === email.trim().toLowerCase() && user.password === password
        );

        if (!foundUser)
        {
            setError("Invalid email or password.");
            return;
        }

        const currentUser = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email
        };

        dispatch(login(currentUser));

        navigate("/events");
    }

    return (
        <section className="auth-page">
            <div className="auth-card">
                <p className="eyebrow">WELCOME BACK</p>

                <h1>Log in to Evora</h1>

                <p className="muted">
                    Continue discovering experiences you'll love.
                </p>

                <form className="auth-form" onSubmit={handleLogin}>
                    <label htmlFor="email">Email address</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="btn btn-primary btn-full">
                        Log In
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>
            </div>
        </section>
    );
}

export default Login;