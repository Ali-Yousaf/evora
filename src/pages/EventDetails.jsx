import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getEventById } from "../services/ticketMaster"
import { registerEvent } from "../features/registrations/registrationsSlice";

const EMPTY_EVENTS = [];

function EventDetails()
{
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const currentUser = useSelector((state) => state.auth.user);
    const registeredEvents = useSelector((state) => state.registrations.byUser[currentUser?.id] || EMPTY_EVENTS);

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const isRegistered = event && registeredEvents.some((registeredEvent) => registeredEvent.id === event.id);

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
    }, [id]);

    function handleRegistration()
    {
        if (!isAuthenticated)
        {
            navigate("/login");
            return;
        }

        dispatch(registerEvent({ userId: currentUser.id, event }));
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
    const classification = event.classifications?.[0];
    const category = [classification?.segment?.name, classification?.genre?.name, classification?.type?.name]
        .find((name) => name && name.toLowerCase() !== "undefined") || "Event";
    const localDate = event.dates?.start?.localDate;

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
                        {category}
                    </p>

                    <h1>{event.name}</h1>

                    <div className="details-info">
                        <p><strong>Date:</strong> {localDate
                            ? new Date(`${localDate}T12:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" })
                            : "TBA"}</p>

                        <p><strong>Time:</strong> {event.dates?.start?.localTime || "TBA"}</p>

                        <p><strong>Venue:</strong> {venue?.name || "TBA"}</p>

                        <p><strong>City:</strong> {venue?.city?.name || "TBA"}</p>

                        <p><strong>Country:</strong> {venue?.country?.name || "TBA"}</p>

                        <p><strong>Category:</strong> {category}</p>
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
