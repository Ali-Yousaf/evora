import { Link } from "react-router-dom";

function EventCard({ event, onCancel })
{
    const image = event.images?.find((img) => img.ratio === "16_9")?.url || event.images?.[0]?.url;

    const date = event.dates?.start?.localDate;
    const venue = event._embedded?.venues?.[0];
    const classification = event.classifications?.[0];
    const category = [classification?.segment?.name, classification?.genre?.name, classification?.type?.name]
        .find((name) => name && name.toLowerCase() !== "undefined") || "Event";

    return (
        <div className="event-card">
            <div className="event-image">
                {image && <img src={image} alt={event.name} />}

                <span className="event-category">
                    {category}
                </span>
            </div>

            <div className="event-content">
                <p className="event-date">
                    {date
                        ? new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
                        : "Date TBA"}
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

                {onCancel && (
                    <button className="btn btn-cancel" onClick={() => onCancel(event.id)}>
                        Cancel Registration
                    </button>
                )}
            </div>
        </div>
    );
}

export default EventCard;
