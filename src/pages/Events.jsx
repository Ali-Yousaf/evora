
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import EventCard from "../components/EventCard";
import { fetchEvents } from "../features/events/eventSlice";

function Events()
{
    const dispatch = useDispatch();
    const { events, loading, error } = useSelector((state) => state.events);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() =>
    {
        dispatch(fetchEvents());
    }, [dispatch]);

    function handleSearch(event)
    {
        event.preventDefault();
        dispatch(fetchEvents({ keyword, category }));
    }

    function handleCategoryChange(event)
    {
        const selectedCategory = event.target.value;
        setCategory(selectedCategory);
        dispatch(fetchEvents({ keyword, category: selectedCategory }));
    }

    return (
        <section className="page">
            <div className="hero">
                <p className="eyebrow">YOUR NEXT EXPERIENCE STARTS HERE</p>
                <h1>Discover events.<br />Make memories.</h1>
                <p className="hero-description">
                    Explore concerts, sports, theatre, and events happening near you.
                </p>

                <form className="search-bar" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                    />
                    <button className="btn btn-primary">Search</button>
                </form>
            </div>

            <div className="section-heading">
                <div>
                    <p className="eyebrow">FIND YOUR NEXT EXPERIENCE</p>
                    <h2>Explore Events</h2>
                </div>
                <select value={category} onChange={handleCategoryChange} aria-label="Filter events by category">
                    <option value="">All Categories</option>
                    <option value="music">Music</option>
                    <option value="sports">Sports</option>
                    <option value="arts">Arts & Theatre</option>
                    <option value="family">Family</option>
                    <option value="film">Film</option>
                </select>
            </div>

            {loading && <p className="loading-message">Finding upcoming events...</p>}

            {error && <p className="error-message">Unable to load events: {error}</p>}

            {!loading && !error && events.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">✦</div>
                    <h3>No events found</h3>
                    <p>Try another search or category.</p>
                </div>
            )}

            {!loading && !error && events.length > 0 && (
                <>
                    <p className="events-summary">Showing {events.length} upcoming events</p>
                    <div className="events-grid">
                        {events.map((event) => <EventCard key={event.id} event={event} />)}
                    </div>
                </>
            )}
        </section>
    );
}

export default Events;
