
import { Link, useParams } from "react-router-dom";

function EventDetails()
{
    const { id } = useParams();

    return (
        <section className="page">
            <Link to="/events" className="back-link">← Back to events</Link>

            <div className="details-placeholder">
                <p className="eyebrow">EVENT DETAILS</p>
                <h1>Event Information</h1>
                <p className="muted">Event ID: {id}</p>
                <p>Event name, date, venue, location, and image will be loaded from Ticketmaster.</p>

                <button className="btn btn-primary" onClick={() => alert("Registration will be implemented later.")}>
                    Register for Event
                </button>
            </div>
        </section>
    );
}

export default EventDetails;