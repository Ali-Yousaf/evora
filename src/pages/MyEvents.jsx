
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import EventCard from "../components/EventCard";
import { cancelRegistration } from "../features/registrations/registrationsSlice";

const EMPTY_EVENTS = [];

function MyEvents()
{
    const currentUser = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const events = useSelector((state) => state.registrations.byUser[currentUser?.id] || EMPTY_EVENTS);
    const today = new Date().toISOString().split("T")[0];
    const upcomingEvents = events.filter((event) =>
        !event.dates?.start?.localDate || event.dates.start.localDate >= today
    );
    const completedEvents = events.filter((event) =>
        event.dates?.start?.localDate && event.dates.start.localDate < today
    );

    function handleCancel(eventId)
    {
        dispatch(cancelRegistration({ userId: currentUser.id, eventId }));
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
