
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import EventCard from "../components/EventCard";

function MyEvents()
{
    const currentUser = useSelector((state) => state.auth.user);
    const storageKey = `registeredEvents_${currentUser.id}`;
    const [registeredEvents] = useState(() =>
        JSON.parse(localStorage.getItem(`registeredEvents_${currentUser.id}`) || "[]")
    );

    const [events, setEvents] = useState(registeredEvents);
    const today = new Date().toISOString().split("T")[0];
    const upcomingEvents = events.filter((event) =>
        !event.dates?.start?.localDate || event.dates.start.localDate >= today
    );
    const completedEvents = events.filter((event) =>
        event.dates?.start?.localDate && event.dates.start.localDate < today
    );

    function handleCancel(eventId)
    {
        const remainingEvents = events.filter((event) => event.id !== eventId);
        localStorage.setItem(storageKey, JSON.stringify(remainingEvents));
        setEvents(remainingEvents);
    }

    return (
        <section className="page">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">YOUR PERSONAL COLLECTION</p>
                    <h1>My Events</h1>
                    <p className="muted">Keep track of the experiences you've registered for.</p>
                </div>
            </div>

            {events.length === 0 && <div className="empty-state">
                <div className="empty-icon">♡</div>
                <h3>No registered events yet</h3>
                <p>Your registered events will appear here.</p>
                <Link to="/events" className="btn btn-primary">Explore Events</Link>
            </div>}

            {upcomingEvents.length > 0 && (
                <section className="registered-events-section">
                    <h2>Upcoming Events</h2>
                    <div className="events-grid">
                        {upcomingEvents.map((event) => (
                            <EventCard key={event.id} event={event} onCancel={handleCancel} />
                        ))}
                    </div>
                </section>
            )}

            {completedEvents.length > 0 && (
                <section className="registered-events-section">
                    <h2>Completed Events</h2>
                    <div className="events-grid">
                        {completedEvents.map((event) => <EventCard key={event.id} event={event} />)}
                    </div>
                </section>
            )}
        </section>
    );
}

export default MyEvents;
