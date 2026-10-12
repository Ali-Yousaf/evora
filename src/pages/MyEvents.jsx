
import { useState } from "react";
import { Link } from "react-router-dom";

import EventCard from "../components/EventCard";

function MyEvents()
{
    const [registeredEvents] = useState(() =>
        JSON.parse(localStorage.getItem("registeredEvents") || "[]")
    );

    return (
        <section className="page">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
                    <h1>My Events</h1>
                    <p className="muted">Keep track of the experiences you've registered for.</p>
                </div>
            </div>

            {registeredEvents.length === 0 && <div className="empty-state">
                <div className="empty-icon">♡</div>
                <h3>No registered events yet</h3>
                <p>Your registered events will appear here.</p>
                <Link to="/events" className="btn btn-primary">Explore Events</Link>
            </div>}

            {registeredEvents.length > 0 && (
                <div className="events-grid">
                    {registeredEvents.map((event) => <EventCard key={event.id} event={event} />)}
                </div>
            )}
        </section>
    );
}

export default MyEvents;
