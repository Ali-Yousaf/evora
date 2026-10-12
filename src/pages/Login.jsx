
import { Link } from "react-router-dom";

function Login()
{
    return (
        <section className="auth-page">
            <div className="auth-card">
                <p className="eyebrow">WELCOME BACK</p>
                <h1>Log in to Evora</h1>
                <p className="muted">Continue discovering experiences you'll love.</p>

                <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
                    <label htmlFor="email">Email address</label>
                    <input id="email" type="email" placeholder="you@example.com" required />

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Enter your password" required />

                    <button type="submit" className="btn btn-primary btn-full">Log In</button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Create one</Link>
                </p>
            </div>
        </section>
    );
}

export default Login;