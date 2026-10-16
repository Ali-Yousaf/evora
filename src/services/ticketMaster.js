const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

function ensureApiKey()
{
    if (!API_KEY)
    {
        throw new Error("Ticketmaster API key is missing. Add it to the project root .env.local file.");
    }
}

export async function getEvents(keyword = "", category = "", signal)
{
    ensureApiKey();
    const params = new URLSearchParams();

    params.append("apikey", API_KEY);
    params.append("size", "20");
    params.append("sort", "date,asc");
    params.append("startDateTime", `${new Date().toISOString().split("T")[0]}T00:00:00Z`);

    if (keyword !== "")
    {
        params.append("keyword", keyword);
    }

    if (category !== "")
    {
        params.append("classificationName", category);
    }

    const response = await fetch(`${BASE_URL}/events.json?${params.toString()}`, { signal });

    if (!response.ok)
    {
        throw new Error(`Ticketmaster request failed (${response.status}).`);
    }

    const data = await response.json();

    const today = new Date().toISOString().split("T")[0];

    return (data._embedded?.events || []).filter((event) =>
        !event.test && event.dates?.start?.localDate >= today
    );
}

export async function getEventById(id)
{
    ensureApiKey();
    const params = new URLSearchParams({ apikey: API_KEY });
    const response = await fetch(`${BASE_URL}/events/${encodeURIComponent(id)}.json?${params.toString()}`);

    if (!response.ok)
    {
        throw new Error(`Ticketmaster request failed (${response.status}).`);
    }

    const data = await response.json();

    return data;
}
