import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getEventById } from "../services/ticketMaster"

function EventDetails()
{
    const { id } = useParams();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const currentUser = useSelector((state) => state.auth.user);

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isRegistered, setIsRegistered] = useState(false);

    useEffect(() =>
    {
        async function loadEvent()
        {
            setLoading(true);
            setError("");

            try
            {
                const data = await getEventById(id);
                setEvent(data);

                if (currentUser)
                {
                    const storageKey = `registeredEvents_${currentUser.id}`;
                    const registeredEvents = JSON.parse(localStorage.getItem(storageKey) || "[]");
                    setIsRegistered(registeredEvents.some((registeredEvent) => registeredEvent.id === data.id));
                }
                else
                {
                    setIsRegistered(false);
                }
            }
            catch (err)
            {
                setError(err.message);
            }
            finally
            {
                setLoading(false);
            }
        }

        loadEvent();
    }, [id, currentUser]);

    function handleRegistration()
    {
        if (!isAuthenticated)
        {
            navigate("/login");
            return;
        }

        const storageKey = `registeredEvents_${currentUser.id}`;
        const registeredEvents = JSON.parse(localStorage.getItem(storageKey) || "[]");

        if (!registeredEvents.some((registeredEvent) => registeredEvent.id === event.id))
        {
            localStorage.setItem(storageKey, JSON.stringify([...registeredEvents, event]));
            setIsRegistered(true);
        }
    }

    if (loading)
    {
        return <div className="page"><h2>Loading event...</h2></div>;
    }

    if (error)
    {
        return <div className="page"><h2>{error}</h2></div>;
    }

    if (!event)
    {
        return <div className="page"><h2>Event not found.</h2></div>;
    }

    const venue = event._embedded?.venues?.[0];
    const image = event.images?.find((img) => img.ratio === "16_9")?.url || event.images?.[0]?.url;

    return (
        <section className="page">
            <Link to="/events" className="back-link">
                ← Back to events
            </Link>

            <div className="event-details">
                {image && (
                    <img className="details-image" src={image} alt={event.name} />
                )}

                <div className="details-content">
                    <p className="eyebrow">
                        {event.classifications?.[0]?.segment?.name || "EVENT"}
                    </p>

                    <h1>{event.name}</h1>

                    <div className="details-info">
                        <p><strong>Date:</strong> {event.dates?.start?.localDate || "TBA"}</p>

                        <p><strong>Time:</strong> {event.dates?.start?.localTime || "TBA"}</p>

                        <p><strong>Venue:</strong> {venue?.name || "TBA"}</p>

                        <p><strong>City:</strong> {venue?.city?.name || "TBA"}</p>

                        <p><strong>Country:</strong> {venue?.country?.name || "TBA"}</p>

                        <p><strong>Category:</strong> {event.classifications?.[0]?.segment?.name || "TBA"}</p>
                    </div>

                    {event.info && (
                        <p className="event-description">{event.info}</p>
                    )}

                    <button className="btn btn-primary" onClick={handleRegistration} disabled={isRegistered}>
                        {isRegistered ? "Registered" : "Register for Event"}
                    </button>

                    <p className="muted registration-note">
                        {isRegistered
                            ? "This event has been added to My Events."
                            : isAuthenticated
                                ? "Save this event to your personal collection."
                                : "Log in to save this event to My Events."}
                    </p>
                </div>
            </div>
        </section>
    );
}

export default EventDetails;
