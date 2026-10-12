import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getEventById } from "../services/ticketmasterApi";

function EventDetails()
{
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

                    <button className="btn btn-primary" disabled>
                        Register for Event
                    </button>

                    <p className="muted registration-note">
                        Event registration will be available soon.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default EventDetails;