const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

function ensureApiKey()
{
    if (!API_KEY)
    {
        throw new Error("Ticketmaster API key is missing. Add it to the project root .env.local file.");
    }
}

export async function getEvents(keyword = "", category = "")
{
    ensureApiKey();
    const params = new URLSearchParams();

    params.append("apikey", API_KEY);
    params.append("size", "20");
    params.append("sort", "date,asc");

    if (keyword !== "")
    {
        params.append("keyword", keyword);
    }

    if (category !== "")
    {
        params.append("classificationName", category);
    }

    const response = await fetch(`${BASE_URL}/events.json?${params.toString()}`);

    if (!response.ok)
    {
        throw new Error(`Ticketmaster request failed (${response.status}).`);
    }

    const data = await response.json();

    return data._embedded?.events || [];
}

export async function getEventById(id)
{
    ensureApiKey();
    const response = await fetch(`${BASE_URL}/events/${encodeURIComponent(id)}.json?apikey=${API_KEY}`);

    if (!response.ok)
    {
        throw new Error(`Ticketmaster request failed (${response.status}).`);
    }

    const data = await response.json();

    return data;
}
