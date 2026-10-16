import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEvents } from "../../services/ticketMaster";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async ({ keyword = "", category = "" } = {}, { signal }) =>
{
    const events = await getEvents(keyword, category, signal);

    return events;
});

const initialState = {
    events: [],
    loading: false,
    error: null,
    currentRequestId: null
};

const eventsSlice = createSlice({
    name: "events",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
    {
        builder
            .addCase(fetchEvents.pending, (state, action) =>
            {
                state.loading = true;
                state.error = null;
                state.currentRequestId = action.meta.requestId;
            })
            .addCase(fetchEvents.fulfilled, (state, action) =>
            {
                if (state.currentRequestId === action.meta.requestId)
                {
                    state.loading = false;
                    state.events = action.payload;
                    state.currentRequestId = null;
                }
            })
            .addCase(fetchEvents.rejected, (state, action) =>
            {
                if (state.currentRequestId === action.meta.requestId)
                {
                    state.loading = false;
                    state.error = action.error.message;
                    state.currentRequestId = null;
                }
            });
    }
});

export default eventsSlice.reducer;