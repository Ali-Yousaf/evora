import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import eventsReducer from "../features/events/eventSlice";
import registrationsReducer from "../features/registrations/registrationsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        events: eventsReducer,
        registrations: registrationsReducer
    }
});

store.subscribe(() =>
{
    try
    {
        const { auth, registrations } = store.getState();

        if (auth.user)
        {
            localStorage.setItem("currentUser", JSON.stringify(auth.user));
        }
        else
        {
            localStorage.removeItem("currentUser");
        }

        localStorage.setItem("registeredEventsByUser", JSON.stringify(registrations.byUser));
    }
    catch
    {
        // Keep the in-memory state usable if browser storage is unavailable.
    }
});