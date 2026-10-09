
import { Link } from "react-router-dom";

function MyEvents()
{
    return (
        <section className="page">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
                    <h1>My Events</h1>
                    <p className="muted">Keep track of the experiences you've registered for.</p>
                </div>
            </div>

            <div className="empty-state">
                <div className="empty-icon">♡</div>
                <h3>No registered events yet</h3>
                <p>Your registered events will appear here.</p>
                <Link to="/events" className="btn btn-primary">Explore Events</Link>
            </div>
        </section>
    );
}

export default MyEvents;