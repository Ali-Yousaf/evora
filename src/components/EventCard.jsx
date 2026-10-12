import { Link } from "react-router-dom";

function EventCard({ event })
{
    const image = event.images?.find((img) => img.ratio === "16_9")?.url || event.images?.[0]?.url;

    const date = event.dates?.start?.localDate;
    const venue = event._embedded?.venues?.[0];

    return (
        <div className="event-card">
            <div className="event-image">
                {image && <img src={image} alt={event.name} />}

                <span className="event-category">
                    {event.classifications?.[0]?.segment?.name || "Event"}
                </span>
            </div>

            <div className="event-content">
                <p className="event-date">
                    {date || "Date TBA"}
                </p>

                <h3>{event.name}</h3>

                <p className="event-location">
                    {venue?.name || "Venue TBA"}
                </p>

                <p className="event-location">
                    {venue?.city?.name || "Location TBA"}
                </p>

                <Link to={`/events/${event.id}`} className="btn btn-primary event-button">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default EventCard;