
import { Link } from "react-router-dom";

function Events()
{
    return (
        <section className="page">
            <div className="hero">
                <p className="eyebrow">YOUR NEXT EXPERIENCE STARTS HERE</p>
                <h1>Discover events.<br />Make memories.</h1>
                <p className="hero-description">
                    Explore concerts, sports, theatre, and events happening near you.
                </p>

                <div className="search-bar">
                    <input type="text" placeholder="Search events..." />
                    <button className="btn btn-primary">Search</button>
                </div>
            </div>

            <div className="section-heading">
                <div>
                    <p className="eyebrow">FIND YOUR NEXT EXPERIENCE</p>
                    <h2>Explore Events</h2>
                </div>
                <select defaultValue="all" aria-label="Filter events by category">
                    <option value="all">All Categories</option>
                    <option value="music">Music</option>
                    <option value="sports">Sports</option>
                    <option value="arts">Arts & Theatre</option>
                </select>
            </div>

            <div className="empty-state">
                <div className="empty-icon">✦</div>
                <h3>Your next event is waiting</h3>
                <p>Events from Ticketmaster will appear here once you connect the API.</p>
            </div>
        </section>
    );
}

export default Events;