import { createSlice } from "@reduxjs/toolkit";

function loadRegistrations()
{
    try
    {
        const saved = localStorage.getItem("registeredEventsByUser");

        if (saved)
        {
            const parsed = JSON.parse(saved);
            return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
        }

        const registrations = {};

        for (let index = 0; index < localStorage.length; index += 1)
        {
            const key = localStorage.key(index);

            if (key?.startsWith("registeredEvents_"))
            {
                const userId = key.slice("registeredEvents_".length);
                const events = JSON.parse(localStorage.getItem(key) || "[]");
                registrations[userId] = Array.isArray(events) ? events : [];
            }
        }

        return registrations;
    }
    catch
    {
        return {};
    }
}

const registrationsSlice = createSlice({
    name: "registrations",
    initialState: { byUser: loadRegistrations() },
    reducers: {
        registerEvent: (state, action) =>
        {
            const { userId, event } = action.payload;
            const registrations = state.byUser[userId] || (state.byUser[userId] = []);

            if (!registrations.some((registeredEvent) => registeredEvent.id === event.id))
            {
                registrations.push(event);
            }
        },
        cancelRegistration: (state, action) =>
        {
            const { userId, eventId } = action.payload;
            state.byUser[userId] = (state.byUser[userId] || []).filter((event) => event.id !== eventId);
        }
    }
});

export const { registerEvent, cancelRegistration } = registrationsSlice.actions;

export default registrationsSlice.reducer;