import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEvents } from "../../services/ticketMasterApi";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async ({ keyword = "", category = "" } = {}) =>
{
    const events = await getEvents(keyword, category);

    return events;
});

const initialState = {
    events: [],
    loading: false,
    error: null
};

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
    {
        builder
            .addCase(fetchEvents.pending, (state) =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEvents.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default eventsSlice.reducer;