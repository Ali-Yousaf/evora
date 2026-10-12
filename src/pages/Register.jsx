import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";

function Register()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleRegister(e)
    {
        e.preventDefault();
        setError("");

        if (name.trim() === "" || email.trim() === "" || password === "")
        {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 6)
        {
            setError("Password must be at least 6 characters.");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const existingUser = users.find((user) => user.email === email.trim().toLowerCase());

        if (existingUser)
        {
            setError("This email is already registered.");
            return;
        }

        const newUser = {
            id: Date.now(),
            name: name.trim(),
            email: email.trim().toLowerCase(),
            password: password
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        const currentUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        };

        dispatch(login(currentUser));

        navigate("/events");
    }

    return (
        <section className="auth-page">
            <div className="auth-card">
                <p className="eyebrow">JOIN THE EXPERIENCE</p>

                <h1>Create an account</h1>

                <p className="muted">
                    Sign up to register for your favorite events.
                </p>

                <form className="auth-form" onSubmit={handleRegister}>
                    <label htmlFor="name">Full name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

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
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="btn btn-primary btn-full">
                        Create Account
                    </button>
                </form>

                <p className="auth-switch">
                    Already registered? <Link to="/login">Log in</Link>
                </p>
            </div>
        </section>
    );
}

export default Register;