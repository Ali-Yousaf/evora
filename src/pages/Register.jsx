
import { Link } from "react-router-dom";

function Register()
{
    return (
        <section className="auth-page">
            <div className="auth-card">
                <p className="eyebrow">JOIN THE EXPERIENCE</p>
                <h1>Create an account</h1>
                <p className="muted">Sign up to register for your favorite events.</p>

                <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
                    <label htmlFor="name">Full name</label>
                    <input id="name" type="text" placeholder="Your name" required />

                    <label htmlFor="email">Email address</label>
                    <input id="email" type="email" placeholder="you@example.com" required />

                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" placeholder="Create a password" required />

                    <button type="submit" className="btn btn-primary btn-full">Create Account</button>
                </form>

                <p className="auth-switch">
                    Already registered? <Link to="/login">Log in</Link>
                </p>
            </div>
        </section>
    );
}

export default Register;